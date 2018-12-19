const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const git = require('git-rev-sync');
const mapKeys = require('lodash/mapKeys');
const pickBy = require('lodash/pickBy');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV || 'development';

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});

/*
 * This lets you use absolute paths in imports inside large monorepos: https://github.com/facebookincubator/create-react-app/issues/253.
 * It works similar to `NODE_PATH` in Node itself: https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
 * Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored. Otherwise, we risk
 * importing Node.js core modules into an app instead of Webpack shims. https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
 * We also resolve them to make sure all tools using them work consistently.
 */
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// only expose env vars that begin with APP_
const APP = /^APP_/i;

function getClientEnvironment(publicUrl) {
  const config = pickBy(process.env, (_, key) => APP.test(key));

  const raw = Object.keys(config).reduce(
    (env, key) => {
      env[key] = config[key];
      return env;
    },
    {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      ...(publicUrl ? { PUBLIC_URL: publicUrl } : {}),
       COMMIT_SHA: git.long(),
    },
  );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
