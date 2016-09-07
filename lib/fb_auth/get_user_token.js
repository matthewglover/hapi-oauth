const { compose, prop } = require('ramda');
const querystring = require('querystring');
const request = require('../../util/request');


// type UserToken = {access_token: String, token_type: String, expires_in: Number}

// userTokenQuery :: Object -> String
const userTokenQuery = ({ code, clientId, clientSecret, baseUrl, authPath }) =>
  querystring.stringify({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: `${baseUrl}${authPath}`,
  });

// userTokenUrl :: String -> String
const userTokenUrl = qs =>
  `https://graph.facebook.com/v2.7/oauth/access_token?${qs}`;

// requestOptions :: Object -> Object
const requestOptions = config =>
  ({
    url: compose(userTokenUrl, userTokenQuery)(config),
    headers: {
      Accept: 'application/json',
    },
  });

// getUserToken :: Object -> Promise UserToken Error
const getUserToken = (config) =>
  request(requestOptions(config))
  .then(prop('body'))
  .then(JSON.parse);

module.exports = getUserToken;
