#!/usr/bin/env bash
set -ex
brew uninstall node@6
NODE_VERSION="8.9.4"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

# iOS
# comment out calls to expo
sed -i .bak 's/PATH=\\"$PATH:$value\\" exp prepare-detached-build --platform ios/\#PATH=\\"$PATH:$value\\" exp prepare-detached-build --platform ios/g' ios/newspring.xcodeproj/project.pbxproj
sed -i .bak 's/value=$(cat ~\/.expo\/PATH)/\#value=$(cat ~\/.expo\/PATH)/g' ios/newspring.xcodeproj/project.pbxproj

# add fake expo files as needed by the Xcode build process
mv ios/newspring/EXBuildConstants.plist.bak ios/newspring/Supporting/EXBuildConstants.plist

# Android
sed -i .bak 's/preBuild.dependsOn exponentPrebuildStep/\/\/preBuild.dependsOn exponentPrebuildStep/g' android/app/build.gradle
sed -i .bak 's/import host.exp.exponent.generated.DetachBuildConstants;/\/\/import host.exp.exponent.generated.DetachBuildConstants;/g' android/app/src/main/java/host/exp/exponent/MainActivity.java
sed -i .bak 's/return DetachBuildConstants.DEVELOPMENT_URL;/return "fakeStringForAppCenter";/g' android/app/src/main/java/host/exp/exponent/MainActivity.java
