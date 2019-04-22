/* eslint-disable */
"use strict";

import { NativeModules, PixelRatio, Platform } from "react-native";
import AssetRegistry from "react-native/Libraries/Image/AssetRegistry";
import AssetSourceResolver from "react-native/Libraries/Image/AssetSourceResolver";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import { Constants } from "expo";

const FS = NativeModules.ExponentFileSystem;

// Return { uri, hash } for an asset's file, picking the correct scale, based on its React Native
// metadata. If the asset isn't an image just picks the first file.
const pickScale = meta => {
  // This logic is based on that in AssetSourceResolver.js, we just do it with our own tweaks for
  // Expo

  const scale =
    meta.scales.length > 1
      ? AssetSourceResolver.pickScale(meta.scales, PixelRatio.get())
      : 1;
  const index = meta.scales.findIndex(s => s === scale);
  const hash = meta.fileHashes[index] || meta.fileHashes[0];

  const suffix =
    "/" +
    meta.name +
    (scale === 1 ? "" : "@" + scale + "x") +
    "." +
    meta.type +
    "?platform=" +
    Platform.OS +
    "&hash=" +
    meta.hash;

  // Allow asset processors to directly provide the URL that will be loaded
  if (meta.uri) {
    return {
      uri: meta.uri,
      hash
    };
  }

  if (/^https?:/.test(meta.httpServerLocation)) {
    // This is a full URL, so we avoid prepending bundle URL/cloudfront
    // This usually means Asset is on a different server, and the URL is present in the bundle
    return {
      uri: meta.httpServerLocation + suffix,
      hash
    };
  }

  if (Constants.manifest.xde) {
    // Development server URI is pieced together
    return {
      uri:
        Constants.manifest.bundleUrl.match(/^https?:\/\/.*?\//)[0] +
        meta.httpServerLocation.replace(/^\/?/, "") +
        suffix,
      hash
    };
  }

  // CDN URI is based directly on the hash
  return {
    uri: "https://d1wp6m56sqw74a.cloudfront.net/~assets/" + hash,
    hash
  };
};

export default class Asset {
  static byModule = {};

  constructor({ name, type, hash, uri, width, height }) {
    this.name = name;
    this.type = type;
    this.hash = hash;
    this.uri = uri;
    if (typeof width === "number") {
      this.width = width;
    }
    if (typeof height === "number") {
      this.height = height;
    }

    this.downloading = false;
    this.downloaded = false;
    this.downloadCallbacks = [];
  }

  static loadAsync(moduleId) {
    let moduleIds = typeof moduleId === "number" ? [moduleId] : moduleId;
    return Promise.all(moduleIds.map(m => Asset.fromModule(m).downloadAsync()));
  }

  static fromModule(moduleId) {
    if (Asset.byModule[moduleId]) {
      return Asset.byModule[moduleId];
    }

    // TODO(nikki): Make React Native's AssetRegistry save moduleId so we don't have to do this here
    const meta = AssetRegistry.getAssetByID(moduleId);
    meta.moduleId = moduleId;
    const { uri, hash } = pickScale(meta);

    const asset = new Asset({
      name: meta.name,
      type: meta.type,
      hash,
      uri,
      width: meta.width,
      height: meta.height
    });
    Asset.byModule[moduleId] = asset;
    return asset;
  }

  static fromUri(uri) {
    if (Asset.byModule[uri]) {
      return Asset.byModule[uri];
    }

    const uriParts = uri.split(".");
    const extension = uriParts.pop();
    const uriWithoutExtension = uriParts.join("").replace(/(\/|:|\.)/g, "");
    const asset = new Asset({
      name: uriWithoutExtension,
      type: extension,
      uri
    });
    Asset.byModule[uri] = asset;
    return asset;
  }

  async downloadAsync() {
    if (this.downloaded) {
      return;
    }
    if (this.downloading) {
      await new Promise((resolve, reject) =>
        this.downloadCallbacks.push({ resolve, reject })
      );
      return;
    }
    this.downloading = true;

    try {
      const localUri = `${FS.cacheDirectory}ExponentAsset-${this.hash ||
        this.name}.${this.type}`;
      let exists, md5;
      ({ exists, md5 } = await FS.getInfoAsync(localUri, {
        cache: true,
        md5: true
      }));
      if (!exists || md5 !== this.hash) {
        const hasHash = !!this.hash;
        ({ md5 } = await FS.downloadAsync(this.uri, localUri, {
          cache: true,
          md5: hasHash
        }));
        if (hasHash && md5 !== this.hash) {
          throw new Error(
            `Downloaded file for asset '${localUri}' ` +
              `Located at ${this.uri} ` +
              `failed MD5 integrity check`
          );
        }
      }
      this.localUri = localUri;
      this.downloaded = true;
      this.downloadCallbacks.forEach(({ resolve }) => resolve());
    } catch (e) {
      this.downloadCallbacks.forEach(({ reject }) => reject(e));
      throw e;
    } finally {
      this.downloading = false;
      this.downloadCallbacks = [];
    }
  }
}

// Override React Native's asset resolution for `Image` components
resolveAssetSource.setCustomSourceTransformer(resolver => {
  if (!resolver.asset.moduleId) {
    return resolver.fromSource(pickScale(resolver.asset).uri);
  }
  const asset = Asset.fromModule(resolver.asset.moduleId);
  return resolver.fromSource(asset.downloaded ? asset.localUri : asset.uri);
});
