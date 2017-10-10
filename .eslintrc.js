module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "plugins": [
    "jest",
  ],
  "rules": {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
  },
  "env": {
    "jest/globals": true,
    "browser": true,
    "node": true,
  },
  "ecmaFeatures": {
    "classes": true,
    "jsx": true
  },
}
