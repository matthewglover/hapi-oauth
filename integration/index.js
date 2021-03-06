require('env2')('./config.env');
const { createServer, setConnection, registerPlugins, addRoutes, startServer } =
  require('@matthewglover/hapi-wrapper');
const hapiOauth = require('../');

const configs = [
  {
    provider: 'facebook',
    loginPath: '/fb-login',
    authPath: '/fb-auth',
    redirectPath: '/process-login',
    baseUrl: process.env.BASE_URL,
    clientId: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    options: {
      scope: 'user_likes',
    },
  },
];

const plugin = {
  register: hapiOauth,
  options: { configs },
};

const processJwtRoute = {
  method: 'GET',
  path: '/process-login',
  handler: (req, reply) => reply(req.query),
};

const server =
  createServer()
  .then(setConnection({ port: 3000 }))
  .then(registerPlugins([plugin]))
  .then(addRoutes([processJwtRoute]))
  .then(startServer)
  /* eslint-disable no-console */
  .then(s => console.log(`Server running at: ${s.info.uri}`))
  .catch(err => console.error(err));
  /* eslint-enable */

module.exports = server;
