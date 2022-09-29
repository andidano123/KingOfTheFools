module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  },
  "extends": "eslint:recommended"
};
