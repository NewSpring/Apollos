#!/usr/bin/env bash
set -ex
brew uninstall node@6
NODE_VERSION="8.9.4"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"
#npm install -g exp && exp path

# comment out expo stuff in build processes
#
# iOS
sed -i -e 's/PATH=\\"$PATH:$value\\" exp prepare-detached-build --platform ios/\#PATH=\\"$PATH:$value\\" exp prepare-detached-build --platform ios/g' ios/newspring.xcodeproj/project.pbxproj
sed -i -e 's/value=$(cat ~\/.expo\/PATH)/\#value=$(cat ~\/.expo\/PATH)/g' ios/newspring.xcodeproj/project.pbxproj

# Android
sed -i -e 's/preBuild.dependsOn exponentPrebuildStep/\/\/preBuild.dependsOn exponentPrebuildStep/g'
