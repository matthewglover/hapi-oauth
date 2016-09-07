const { compose, toUpper, replace } = require('ramda');

// stripUnderscore :: String -> String
const stripUnderscore =
  replace(/_/g, '');

// camelize :: String -> String
const camelize =
	replace(/_\w/g, compose(toUpper, stripUnderscore));

module.exports = camelize;
