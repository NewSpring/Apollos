const Path = require('path');
const FS = require('fs');
const fetch = require('node-fetch');
const TOKEN = process.env.RAW_SETTINGS_TOKEN;
const env = process.env.NODE_ENV;

(async () => {
  try {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };

    const response = await fetch(
      'https://api.github.com/repos/newspring/ops-settings/contents/sites/apollos/settings.json?access_token=' +
        TOKEN,
      headers,
    );

    const settings = await response.json();

    const localContent = `
# Make sure ROOT_URL does not have a trailing slash
APP_ROOT_URL='${settings.local.rootURL}'
APP_ROCK_URL='${settings.local.rock.baseURL}'
APP_ROCK_PUBLIC_TOKEN='${settings.local.rock.token}'
APP_HEIGHLINER_URL='${settings.local.heighliner}'
APP_SENTRY_URL='${settings.local.sentry}'
SENTRY_AUTH='${settings.local.sentryAuth}'
AMPLITUDE_KEY='${settings.local.amplitude}'`;

    const testContent = `
# Make sure ROOT_URL does not have a trailing slash
APP_ROOT_URL='${settings.test.rootURL}'
APP_ROCK_URL='${settings.test.rock.baseURL}'
APP_ROCK_PUBLIC_TOKEN='${settings.test.rock.token}'
APP_HEIGHLINER_URL='${settings.test.heighliner}'
APP_SENTRY_URL='${settings.test.sentry}'
SENTRY_AUTH='${settings.test.sentryAuth}'
AMPLITUDE_KEY='${settings.test.amplitude}'`;

    const productionContent = `
# Make sure ROOT_URL does not have a trailing slash
APP_ROOT_URL='${settings.prod.rootURL}'
APP_ROCK_URL='${settings.prod.rock.baseURL}'
APP_ROCK_PUBLIC_TOKEN='${settings.prod.rock.token}'
APP_HEIGHLINER_URL='${settings.prod.heighliner}'
APP_SENTRY_URL='${settings.prod.sentry}'
SENTRY_AUTH='${settings.prod.sentryAuth}'
AMPLITUDE_KEY='${settings.prod.amplitude}'`;

    const envContent =
      env === 'production' ? productionContent : env === 'test' ? testContent : localContent;

    await FS.writeFileSync(Path.resolve(__dirname, '../.env'), envContent);
  } catch (e) {
    console.log(e);
  }
})();
