module.exports = env => ({
  expo: {
    sdkVersion: '30.0.0',
    name: 'NewSpring',
    description: 'The official NewSpring mobile app.',
    slug: 'newspring',
    primaryColor: '#6bac43',
    icon: 'src/assets/icons/ios/icon-1024x1024.png',
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
    },
  },
});
