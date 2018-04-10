module.exports = env => ({
  expo: {
    sdkVersion: '26.0.0',
    name: 'NewSpring',
    version: '6.0.0',
    description: 'The official NewSpring mobile app.',
    primaryColor: '#6bac43',
    slug: 'newspring',
    orientation: 'portrait',
    scheme: 'newspring',
    ios: {
      bundleIdentifier: 'com.subsplashstudio31.NewSpring-Church',
      buildNumber: '19',
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
        image: 'src/assets/splash/splash-1242x2436.png',
        backgroundColor: '#D1DCE6',
      },
      loadJSInBackgroundExperimental: true,
    },
    android: {
      package: 'cc.newspring.newspringapp',
      versionCode: 600012,
      icon: 'src/assets/icons/android/icon-192x192-xxxhpdi.png',
      splash: {
        mdpi: 'src/assets/splash/splash-1242x2436.png',
        hdpi: 'src/assets/splash/splash-1242x2436.png',
        xhdpi: 'src/assets/splash/splash-1242x2436.png',
        xxhdpi: 'src/assets/splash/splash-1242x2436.png',
        xxxhdpi: 'src/assets/splash/splash-1242x2436.png',
        backgroundColor: '#D1DCE6',
      },
    },
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'newspring-church',
            project: 'app',
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
