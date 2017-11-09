const fs = require('fs');
const request = require('request');
const childProcess = require('child_process');

const {
  EXP_USERNAME,
  EXP_PASSWORD,
  GITHUB_TOKEN_FOR_STATUSES,
  TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST,
  TRAVIS_PULL_REQUEST_SHA,
  TRAVIS_REPO_SLUG,
  EXPO_PRIVACY,
} = process.env;

const exp = './node_modules/exp/bin/exp.js';

const readPackageJSON = () => (
  JSON.parse(fs.readFileSync('./package.json'))
);

const writePackageJSON = (content) => {
  fs.writeFileSync('./package.json', JSON.stringify(content, null, 2));
}

const githubOrg = (TRAVIS_REPO_SLUG || '').split('/')[0];
const githubRepo = (TRAVIS_REPO_SLUG || '').split('/')[1];
const branchName = TRAVIS_PULL_REQUEST_BRANCH || TRAVIS_BRANCH;
const package = readPackageJSON();
const packageName = package.name;

const getExpPublishName = () => (
  `${packageName}-${branchName}`.replace(/[^a-zA-Z0-9\\-]/, '-')
);

const status = ({ state = 'pending', description = '', error } = {}) => {
  console.log(description);
  if (GITHUB_TOKEN_FOR_STATUSES && TRAVIS_PULL_REQUEST_SHA && EXP_USERNAME) {
    // send a status:
    const statusUrl = `https://api.github.com/repos/${githubOrg}/${githubRepo}/statuses/${TRAVIS_PULL_REQUEST_SHA}`;
    const targetUrl = `https://expo.io/@${EXP_USERNAME}/${getExpPublishName()}`;

    const payload = {
      state,
      description,
      target_url: targetUrl,
      context: 'deploy/exponent',
    }

    request.post(
      {
        url: statusUrl,
        headers: {
          'User-Agent': 'ci',
          'Authorization': `token ${GITHUB_TOKEN_FOR_STATUSES}`,
        },
        body: JSON.stringify(payload),
      },
      (error, response) => {
        if (error) {
          console.error('Failed to post status to GitHub, an error occurred', error);
        } else if (response.statusCode >= 400) {
          console.error('Failed to post status to GitHub, request failed with', response);
        } else {
          console.log(`Posted status to GitHub`);
        }
      }
    );
  }
  if (state === 'error') {
    throw new Error(error || description);
  }
};

const cwd = __dirname + '/../';
const spawn = (task, args, onClose) => {
  const child = childProcess.spawn(task, args, {
    stdio: 'inherit',
    env: process.env,
    cwd,
  });
  child.on('error', error => console.log(error));
  child.on('close', code => onClose(code));
}

// Overwrite package.json name
status({ description: 'Preparing build...' });
const modifiedPackage = Object.assign({}, package, {
  name: getExpPublishName(),
  privacy: EXPO_PRIVACY || 'unlisted',
})

writePackageJSON(modifiedPackage);

// Start Deploy:
status({ description: 'Logging into expo...' });
spawn(exp, ['login', '-u', EXP_USERNAME, '-p', EXP_PASSWORD], (loginError) => {
  if (loginError) return status({ state: 'error', description: 'Expo Login Failed', error: loginError });

  status({ description: 'Publishing project to expo...' });
  spawn(exp, ['publish', '--non-interactive'], (publishError) => {
    if (publishError) return status({ state: 'error', description: 'Expo publish failed', error: publishError });

    status({ state: 'success', description: 'Deploy finished!' });
  });
});