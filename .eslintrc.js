module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "plugins": [
    "jest",
  ],
  "rules": {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "react/jsx-filename-extension": 0,
    "react/jsx-curly-brace-presence": 0,
    "react/prefer-stateless-function": [2, { "ignorePureComponents": true }],
    "function-paren-newline": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "global-require": 0,
  },
  "env": {
    "jest/globals": true,
    "browser": true,
    "node": true,
  }
}
