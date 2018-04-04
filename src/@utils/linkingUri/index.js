import { Constants } from 'expo';

let { linkingUri } = Constants;

if (linkingUri.endsWith('/+')) {
  linkingUri = linkingUri.slice(0, -2);
}

const linkingUrlToExport = linkingUri;
export default linkingUrlToExport;
