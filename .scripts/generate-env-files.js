const Path = require('path');
const FS = require('fs');
const fetch = require('node-fetch');
const TOKEN = process.env.RAW_SETTINGS_TOKEN;
const env = process.env.NODE_ENV;

(async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/NewSpring/ops-settings/master/sites/apollos/settings.json' +
        '?token=' +
        TOKEN,
    );

    const settings = await response.json();

    const localContent = `
# Make sure ROOT_URL does not have a trailing slash
APP_ROOT_URL='${settings.local.rootURL}'
APP_ROCK_URL='${settings.local.rock.baseURL}'
APP_ROCK_PUBLIC_TOKEN='${settings.local.rock.token}'
APP_HEIGHLINER_URL='${settings.local.heighliner}'
APP_SENTRY_URL='${settings.local.sentry}'
SENTRY_AUTH='${settings.local.sentryAuth}'`;

    const testContent = `
# Make sure ROOT_URL does not have a trailing slash
APP_ROOT_URL='${settings.test.rootURL}'
APP_ROCK_URL='${settings.test.rock.baseURL}'
APP_ROCK_PUBLIC_TOKEN='${settings.test.rock.token}'
APP_HEIGHLINER_URL='${settings.test.heighliner}'
APP_SENTRY_URL='${settings.test.sentry}'
SENTRY_AUTH='${settings.test.sentryAuth}'`;

    const productionContent = `
# Make sure ROOT_URL does not have a trailing slash
APP_ROOT_URL='${settings.prod.rootURL}'
APP_ROCK_URL='${settings.prod.rock.baseURL}'
APP_ROCK_PUBLIC_TOKEN='${settings.prod.rock.token}'
APP_HEIGHLINER_URL='${settings.prod.heighliner}'
APP_SENTRY_URL='${settings.prod.sentry}'
SENTRY_AUTH='${settings.prod.sentryAuth}'`;

    const envContent =
      env === 'production' ? productionContent : env === 'test' ? testContent : localContent;

    await FS.appendFile(Path.resolve(__dirname, '../.env'), envContent, err => {
      if (err) console.log(err);
      console.log('Local environment settings created.');
    });
  } catch (e) {
    console.log(e);
  }
})();
