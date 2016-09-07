

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
const register = (server, options, next) => {
  next();
};

module.exports = register;
