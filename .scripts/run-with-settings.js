const Fs = require('fs');
const { spawn } = require('child_process');
const Path = require('path');

const rawConfig = Fs.readFileSync(Path.resolve(__dirname, '../settings.json'), 'utf8');
const config = JSON.parse(rawConfig);

const args = process.argv.slice(2);

const [command] = args;

spawn(command, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    ...config,
  },
});
