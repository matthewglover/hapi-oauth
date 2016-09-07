const { toPairs, fromPairs, map, compose } = require('ramda');
const camelize = require('./camelize');


// camelizeProps :: Object -> Object
const camelizeProps =
  compose(fromPairs, map(([k, v]) => [camelize(k), v]), toPairs);

module.exports = camelizeProps;
