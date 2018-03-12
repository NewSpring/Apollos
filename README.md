# Apollos test

![NewSpring Apollos](https://img.shields.io/badge/NEWSPRING_CHURCH-Apollos-6BAC43.svg?style=flat&logoWidth=17&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd%2BUAAAABGdBTUEAALGPC/xhBQAAAeFJREFUSA29lU0rRFEYx%2B81k/eFUpO3hUmREpGEYrKQ2VGslLKwkw/iC/AFbKVsvSTFIMVydsSCGHsvmev3THOv6cy5Z17c66nfnDnP23/Oveecsa0yzHGcYdIWYAo6oQMikIFXuIETOLJt%2B4mxOkNoCdJQrn2RuANDFSlSEIcUVGtZCjchWlKYpARkIAg7p0mLryjBBHxCkHZMs9oiUZzyGINamfqDt3WCf3lnqoA6/8Yx4Ikykd0Ytu2LoC0fKKUZ%2BuS7xpbx3Wv8rkt2Yi9MwCrI%2BdSZg7NNxEZKLK1fV63z0WcMng39VmoonNcVV%2BPjlrmibt1QmxTBaUOCNsQK6mASutUERHfx%2BV1vPSIo92LZhkgDyddwBnfM1zTFDxqfuGIVC1Ikr%2BB3i1vWhnRS7EOZu9OcoN%2BucpPUsUtxNCtz07RJVvhmytDEpKbQcker0GH6LsUZU0LQMRG8DbqpqZ8InpoSgo6J4CFkg27s1y/KQX3kLO2RsOiT1Eo8VhBTd2VEiUtq8f9fvoF7eY8zT%2BV9oQ7ySC1WecGwFapSvrl3hngs9fguYTBM4dwKRYBVvjPMgtz4oZknKAqIvjDMwA7IH%2Bb/GY94FA4gUPPeod9SUGsnloQ5iIMcEaERKrYfBD49JTL9FwYAAAAASUVORK5CYII%3D)
![MIT License](https://img.shields.io/github/license/NewSpring/Apollos.svg)
[![Build Status](https://travis-ci.org/NewSpring/Apollos.svg?branch=master)](https://travis-ci.org/NewSpring/Apollos)
[![Coverage Status](https://coveralls.io/repos/github/NewSpring/Apollos/badge.svg)](https://coveralls.io/github/NewSpring/Apollos)

## Notes to potential Apollos-project partners

This repo is the current React-Native version of the NewSpring app. It is a react-native/react-native-web port of [Holtzman](https://github.com/newspring/holtzman). It's intended to serve as a starting point for the open-source initiative in the larger Apollos project. However, this repo is not necessarilly intended to be forked or directly implemented for other organizations (although you're more then welcome to!). Instead, we plan to rip out the core UI components into a separate UI component library ("apollos-ui"), and also release a (small) set of tooling to facilitate creating an Apollos app. This tooling would likely be based on something like [Create React Native App](https://github.com/react-community/create-react-native-app) and could contain a boilerplate set up with a turn-key "Church app" ready to go for your customization.

Other relevant projects in the NewSpring ecosystem:

* [Heighliner](https://github.com/newspring/heighliner): The current GraphQL implementation that this project connects to. In the future, we forsee releasing a separate "Apollos Data" project to replace Heighliner.
* [Holtzman](https://github.com/newspring/holtzman): The existing React / Cordova based NewSpring app. This repo is a direct React-Native / React-Native port of this project.

## Getting Started

Apollos is a reactive application framework for building react web + react native applications. It is built using [React-Native](https://facebook.github.io/react-native/), [Apollo](https://github.com/apollographql), [React Native Web](https://github.com/necolas/react-native-web), [Create React Native App](https://github.com/react-community/create-react-native-app) and [Create React App](https://github.com/facebookincubator/create-react-app). This repository contains the application framework and instructions for usage.

Browse [the interactive documentation](https://newspring.github.io/Apollos/), check out the `master` branch on [the web](https://apollos.netlify.com/) or on your mobile device with [Expo](https://expo.io/@newspring-builds/apollos-master):

[![Expo QR Code](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=exp://exp.host/@newspring-builds/newspring-master)](https://expo.io/@newspring-builds/newspring-master)

## Table of Contents

* [Quick Start](#quick-start)
* [Available Scripts](#available-scripts)
  * [yarn start](#yarn-start)
  * [yarn test](#yarn-test)
  * [yarn run ios](#yarn-run-ios)
  * [yarn run android](#yarn-run-android)
  * [yarn run eject](#yarn-run-eject)
* [Writing and Running Tests](#writing-and-running-tests)
* [Environment Variables](#environment-variables)
  * [Configuring Packager IP Address](#configuring-packager-ip-address)
* [Adding Flow](#adding-flow)
* [Customizing App Display Name and Icon](#customizing-app-display-name-and-icon)
* [Sharing and Deployment](#sharing-and-deployment)
  * [Publishing to Expo's React Native Community](#publishing-to-expos-react-native-community)
  * [Building an Expo "standalone" app](#building-an-expo-standalone-app)
  * [Ejecting from Create React Native App](#ejecting-from-create-react-native-app)
    * [Build Dependencies (Xcode & Android Studio)](#build-dependencies-xcode-android-studio)
    * [Should I Use ExpoKit?](#should-i-use-expokit)
* [Troubleshooting](#troubleshooting)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [QR Code does not scan](#qr-code-does-not-scan)

## Quick Start

```bash
git clone git@github.com:NewSpring/Apollos.git
cd Apollos
yarn install
yarn start
```

## Available Scripts

### `yarn start`

Runs Apollos in development mode for native (mobile) devices.
Open it in the [Expo app](https://expo.io) on your phone to view it, or press one of the available options in the packager after it starts. It will reload if you save edits to files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `yarn test`

Runs [eslint](https://eslint.org/) and the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `yarn run web`

Like `yarn start`, but builds the app for web. Will also open a web browser.

#### `yarn run ios`

Like `yarn start`, but also attempts to open the app in the iOS Simulator if you're on a Mac and have it installed.

#### `yarn run android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `yarn run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

#### `yarn run web`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

#### `yarn run build`

Creates a build for the web version of the app.

#### `yarn run build-storybook`

Like `yarn run build`, except it creates a build for storybook on web.

#### `yarn run storybook-native-start`

Starts the native storybook packager. `yarn run storybook-ios` or `yarn run storybook-android` is also required to view storybook on a device (TODO: this experience should be improved).

#### `yarn run storybook-web`

Starts the storybook web packager.

## Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/tutorial-react-native.html).

## Environment Variables

You can configure environment variables by creating a `.env` file.

TODO: document required env vars.

## Sharing and Deployment

Create React Native App does a lot of work to make app setup and development simple and straightforward, but it's very difficult to do the same for deploying to Apple's App Store or Google's Play Store without relying on a hosted service.

### Publishing to Expo's React Native Community

Expo provides free hosting for apps created by CRNA, allowing you to share your app through the Expo client app. This requires registration for an Expo account.

Install the `exp` command-line tool, and run the publish command:

```
$ yarn i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use a service like [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) if you want to get an IPA/APK for distribution without having to build the native code yourself.

#### Can I eject from CRNA?

See the [ejecting guide](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md) for more details about this option.

## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `yarn run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `yarn/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `yarn/yarn run ios`.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.
