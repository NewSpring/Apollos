const fs = require('fs');
const { spawn } = require('child_process');
const getEnv = require('../config/env');
const getConfig = require('../app-config.js');

const args = process.argv.slice(2);

const [command] = args;

const appEnv = getEnv().raw;

const config = getConfig(appEnv);
fs.writeFileSync('./app.json', JSON.stringify(config, null, 2), 'utf8');

const runner = spawn(command, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    ...appEnv,
  },
});

runner.on('close', (code) => {
  process.exit(code);
});
