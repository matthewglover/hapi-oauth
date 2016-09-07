const { prop } = require('ramda');
const request = require('../../util/request');

const PROVIDER_DETAILS = { provider: 'facebook' };

// userDetailsUrl :: String -> String
const userDetailsUrl = accessToken =>
  `https://graph.facebook.com/me?access_token=${accessToken}`;

// requestOptions :: String -> Object
const requestOptions = accessToken =>
  ({
    url: userDetailsUrl(accessToken),
    headers: {
      Accept: 'application/json',
    },
  });

// getUserDetails :: UserToken -> Promise Object
const getUserDetails = userToken =>
  request(requestOptions(userToken.access_token))
  .then(prop('body'))
  .then(JSON.parse)
  .then(userDetails => Object.assign({}, PROVIDER_DETAILS, userDetails, userToken));

module.exports = getUserDetails;
