const querystring = require('querystring');
const getUserToken = require('./get_user_token');
const getUserDetails = require('./get_user_details');
const camelizeProps = require('../../util/camelize_props');


const fbAuthenticate = (config) =>
  ({
    path: config.authPath,
    method: 'GET',
    handler(req, reply) {
      Promise.resolve(Object.assign({ code: req.query.code }, config))
      .then(getUserToken)
      .then(getUserDetails)
      .then(camelizeProps)
      .then(config.generateToken)
      .then(jwt => querystring.stringify({ jwt }))
      .then(qs => `${config.redirectPath}?${qs}`)
      .then(reply.redirect.bind(reply));
    },
  });

module.exports = fbAuthenticate;
