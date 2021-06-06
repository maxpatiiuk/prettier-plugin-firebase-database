module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/core-modules': [],
  },
  extends: ['@maxxxxxdlp/eslint-config'],
  rules: {},
};
