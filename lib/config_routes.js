const fbLogin = require('./fb_login');
const fbAuth = require('./fb_auth');

const configRoutes = config => {
  switch (config.provider) {
    case 'facebook':
      return [fbLogin(config), fbAuth(config)];
    default :
      return [];
  }
};

module.exports = configRoutes;
