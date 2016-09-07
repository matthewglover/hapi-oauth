const { compose, chain, bind } = require('ramda');
const configRoutes = require('./config_routes');

// type AuthConfig = {
//   provider: String,
//   loginPath: String,
//   authPath: String,
//   baseUrl: String,
//   clientId: String,
//   clientSecret: String
//   generateToken: Function
// }
//
// type Options = { authConfigs: [AuthConfig] }

//  register :: (Hapi.Server, Options, Function) -> void
const register = (server, options, next) =>
  compose(next, bind(server.route, server), chain(configRoutes))(options.configs);

module.exports = register;
