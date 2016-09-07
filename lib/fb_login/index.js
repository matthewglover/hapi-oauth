const { createRedirectUri } = require('./helpers');

// type LoginConfig = {
//   loginPath: String,
//   authPath: String,
//   baseUrl: String,
//   clientId: String,
//   clientSecret: String,
// }

// fbLogin :: LoginConfig -> Hapi.Route
const fbLogin = ({ loginPath, clientId, baseUrl, authPath }) => {
  const redirectUri = createRedirectUri({ clientId, baseUrl, authPath });

  return {
    method: 'GET',
    path: loginPath,
    handler: (req, reply) => reply.redirect(redirectUri),
  };
};

module.exports = fbLogin;
