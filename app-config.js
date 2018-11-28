module.exports = env => ({
  expo: {
    sdkVersion: '25.0.0',
    name: 'NewSpring',
    version: '6.1.2',
    description: 'The official NewSpring mobile app.',
    primaryColor: '#6bac43',
    slug: 'newspring',
    orientation: 'portrait',
    android: {
      package: 'cc.newspring.newspringapp',
      versionCode: 600025,
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
    isDetached: true,
    detach: {
      scheme: 'expba3ad9e96a6043fc95726c73cb381a27',
      iosExpoViewUrl:
        'https://s3.amazonaws.com/exp-exponent-view-code/ios-v2.3.3-sdk25.0.0-e7a4361a-631d-4caf-9692-1880d71c394a.tar.gz',
      androidExpoViewUrl:
        'https://s3.amazonaws.com/exp-exponent-view-code/android-v2.3.0-sdk25.0.0-0c32461b-a7c6-4ddc-b85b-32a80c4f18d9.tar.gz',
    },
  },
});
