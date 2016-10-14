const { createRedirectUri } = require('./helpers');

// type LoginConfig = {
//   loginPath: String,
//   authPath: String,
//   baseUrl: String,
//   clientId: String,
//   clientSecret: String,
// }

// fbLogin :: LoginConfig -> Hapi.Route
const fbLogin = ({ loginPath, clientId, baseUrl, authPath, options }) => {
  const redirectUri = createRedirectUri({ clientId, baseUrl, authPath, options });

  return {
    method: 'GET',
    path: loginPath,
    config: { auth: false },
    handler: (req, reply) => {
      reply.redirect(redirectUri);
    },
  };
};

module.exports = fbLogin;
