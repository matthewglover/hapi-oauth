const USER_TOKEN = {
  access_token: 'facebook-access-token',
  token_type: 'bearer',
  expires_in: 'timeinsecondstoexpiry',
};

const USER_DETAILS = {
  name: 'Matthew Glover',
  id: 'facebookid',
};

const AWFUL_ERROR = {
  message: 'something awful happened',
  code: 'AWFUL_ERROR',
};

const AUTH_CONFIG = {
  code: 'facebook-code',
  loginPath: '/fb-login',
  authPath: '/fb-auth',
  baseUrl: 'localhost',
  clientId: 'facebook-client-id',
  clientSecret: 'facebook-secret',
};

module.exports = {
  USER_TOKEN,
  USER_DETAILS,
  AWFUL_ERROR,
  AUTH_CONFIG,
};
