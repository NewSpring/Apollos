/* eslint-disable */
const baseConfig = require('../../../config/webpack.config.dev.js');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.entry.preview = [
    ...baseConfig.entry,
    ...storybookBaseConfig.entry.preview,
  ];

  storybookBaseConfig.resolve = baseConfig.resolve;

  storybookBaseConfig.module.rules = [
    ...baseConfig.module.rules,
    ...storybookBaseConfig.module.rules,
  ];

  return storybookBaseConfig;
};
