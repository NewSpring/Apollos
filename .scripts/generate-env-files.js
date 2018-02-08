const Path = require('path');
const FS = require('fs');
const fetch = require('node-fetch');
const TOKEN = ''; // Insert Private repository token.

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
ROOT_URL='${settings.local.rootURL}'
ROCK_URL='${settings.local.rock.baseURL}'
ROCK_PUBLIC_TOKEN='${settings.local.rock.token}'
HEIGHLINER_URL='${settings.local.heighliner}'
SENTRY_URL='${settings.local.sentry}'`;

  const testContent = `
# Make sure ROOT_URL does not have a trailing slash
ROOT_URL='${settings.test.rootURL}'
ROCK_URL='${settings.test.rock.baseURL}'
ROCK_PUBLIC_TOKEN='${settings.test.rock.token}'
HEIGHLINER_URL='${settings.test.heighliner}'
SENTRY_URL='${settings.test.sentry}'`;

  const productionContent = `
# Make sure ROOT_URL does not have a trailing slash
ROOT_URL='${settings.prod.rootURL}'
ROCK_URL='${settings.prod.rock.baseURL}'
ROCK_PUBLIC_TOKEN='${settings.prod.rock.token}'
HEIGHLINER_URL='${settings.prod.heighliner}'
SENTRY_URL='${settings.prod.sentry}'`;

    await FS.appendFile(Path.resolve(__dirname, '../.env.development'), localContent, (err) => {
      if (err) console.log(err);
      console.log("Local environment settings created.");
    })
    await FS.appendFile(Path.resolve(__dirname, '../.env.test'), testContent, (err) => {
      if (err) console.log(err);
      console.log("Test environment settings created.");
    })
    await FS.appendFile(Path.resolve(__dirname, '../.env.production'), productionContent, (err) => {
      if (err) console.log(err);
      console.log("Production environment settings created.");
    })
  } catch (e) {
    console.log(e);
  }

})();
