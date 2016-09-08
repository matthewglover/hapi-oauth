const { curry, compose } = require('ramda');
const querystring = require('querystring');

// type AuthConfig = { clientId: String, baseUrl: String, authPath: String }

const FACEBOOK_URL = 'https://www.facebook.com';
const FACEBOOK_PATH = '/dialog/oauth';


// authQuery :: AuthConfig -> String
const authQuery = ({ clientId, baseUrl, authPath, options }) =>
  `?${querystring.stringify(Object.assign({
    client_id: clientId,
    redirect_uri: baseUrl + authPath,
  }, options || {}))}`;

// createUri :: String -> String -> String -> String
const createUri = curry((url, path, query) =>
  url + path + query);

// createRedirectUri :: AuthConfig -> String
const createRedirectUri =
  compose(createUri(FACEBOOK_URL, FACEBOOK_PATH), authQuery);

module.exports = {
  authQuery,
  createUri,
  createRedirectUri,
};
