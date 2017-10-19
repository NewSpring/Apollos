const Fs = require('fs');
const { spawn } = require('child_process');
const Path = require('path');
const mapKeys = require('lodash/mapKeys');

const rawConfig = Fs.readFileSync(Path.resolve(__dirname, '../settings.json'), 'utf8');
const config = JSON.parse(rawConfig);
const platformConfigs = {
  native: mapKeys(config, (v, k) => (`REACT_NATIVE_${k}`)),
  web: mapKeys(config, (v, k) => (`REACT_APP_${k}`)),
};
const mappedConfig = {
  ...platformConfigs.native,
  ...platformConfigs.web,
};

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
