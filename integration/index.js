require('env2')('./config.env');
const { createServer, setConnection, registerPlugins, addRoutes, startServer } =
  require('@matthewglover/hapi-wrapper');
const hapiOauth = require('../');
const signJWT = require('../util/sign_jwt');

const configs = [
  {
    provider: 'facebook',
    loginPath: '/fb-login',
    authPath: '/fb-auth',
    redirectPath: '/process-jwt',
    baseUrl: process.env.BASE_URL,
    clientId: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    generateToken: signJWT({ algorithm: 'HS256' }, 'my-secret-string'),
  },
];

const plugin = {
  register: hapiOauth,
  options: { configs },
};

const processJwtRoute = {
  method: 'GET',
  path: '/process-jwt',
  handler: (req, reply) => {
    reply(req.query.jwt);
  },
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
