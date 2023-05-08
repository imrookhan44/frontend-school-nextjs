module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  globals: {},
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react']
    },
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    requireConfigFile: false,
    sourceType: 'module'
  },
  plugins: ['react', 'import', 'react-hooks'],
  ignorePatterns: ['node_modules/'],
  rules: {},
  settings: {
    react: {
      version: 'detect'
    }
  }
};
