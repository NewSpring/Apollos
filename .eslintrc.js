module.exports = {
  "extends": ["airbnb"],
  "plugins": [
    "jest",
  ],
  "rules": {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
  },
  "env": {
    "jest/globals": true,
    "browser": true,
    "node": true,
  },
}
