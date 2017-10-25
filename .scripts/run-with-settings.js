const Fs = require('fs');
const { spawn } = require('child_process');
const Path = require('path');
const mapKeys = require('lodash/mapKeys');
const dotenv = require('dotenv');

const envFile = '../.env';
const fileExists = Fs.existsSync(envFile);

let mappedConfig = {};

if (fileExists) {
  const rawConfig = Fs.readFileSync(Path.resolve(__dirname, envFile), 'utf8');
  const config = dotenv.parse(rawConfig);
  const platformConfigs = {
    native: mapKeys(config, (v, k) => (`REACT_NATIVE_${k}`)),
    web: mapKeys(config, (v, k) => (`REACT_APP_${k}`)),
  };
  mappedConfig = {
    ...platformConfigs.native,
    ...platformConfigs.web,
  };
}

const args = process.argv.slice(2);

const [command] = args;

spawn(command, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    ...mappedConfig,
  },
});
