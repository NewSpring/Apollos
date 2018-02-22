module.exports = env => ({
  expo: {
    sdkVersion: '25.0.0',
    name: 'NewSpring',
    version: '6.0.0',
    description: 'The official NewSpring mobile app.',
    primaryColor: '#6bac43',
    slug: 'newspring',
    orientation: 'portrait',
    scheme: 'newspring',
    ios: {
      bundleIdentifier: 'com.subsplashstudio31.NewSpring-Church',
      buildNumber: '0',
      supportsTablet: true,
      associatedDomains: [
        'applinks:beta.newspring.cc',
        'applinks:newspring.cc',
        'applinks:beta-my.newspring.cc',
        'applinks:my.newspring.cc',
        'applinks:rm2y5.app.goo.gl',
      ],
      icon: 'src/assets/icons/ios/icon-1024x1024.png',
      splash: {
        image: 'src/assets/splash/ios/768_1024.png',
        backgroundColor: '#1c683e',
      },
    },
    android: {
      package: 'cc.newspring.newspringapp',
      versionCode: 600000,
      icon: 'src/assets/icons/android/icon-192x192-xxxhpdi.png',
      splash: {
        backgroundColor: '#1c683e',
        mdpi: 'src/assets/splash/android/320_470.png',
        hdpi: 'src/assets/splash/android/480_640.png',
        xhdpi: 'src/assets/splash/android/720_960.png',
        xxhdpi: 'src/assets/splash/android/1080_1440.png',
      },
    },
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'differential-cs',
            project: 'newspring-apollos',
            authToken: process.env.SENTRY_AUTH,
          },
        },
      ],
    },
    extra: {
      ...env,
    },
  },
});
