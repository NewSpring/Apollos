module.exports = env => ({
  expo: {
    sdkVersion: '26.0.0',
    name: 'NewSpring',
    slug: 'newspring',
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
