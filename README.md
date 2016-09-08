[![Build Status](https://travis-ci.org/matthewglover/hapi-oauth.svg?branch=master)](https://travis-ci.org/matthewglover/hapi-oauth) [![Coverage Status](https://coveralls.io/repos/github/matthewglover/hapi-oauth/badge.svg?branch=master)](https://coveralls.io/github/matthewglover/hapi-oauth?branch=master)

# hapi-oauth

## What
A Hapi.js plugin providing Oauth login. Currently just for Facebook.

## Why
To implement a simple minimal oauth setup, and to learn more about oauth and plugins.

## How

To install, run `npm install --save @matthewglover/hapi-oauth`.

A simple implementation:

```javascript
const { createServer, setConnection, registerPlugins, addRoutes, startServer } =
  require('@matthewglover/hapi-wrapper');
const hapiOauth = require('@matthewglover/hapi-oauth');

const options = {
  configs: [
    {
      provider: 'facebook',                       // name of provider (currently only facebook)
      loginPath: '/fb-login',                     // path to start login process
      authPath: '/fb-auth',                       // path to complete login process
      redirectPath: '/process-login',             // path to handle any post-login
      baseUrl: 'your.domain.com',                 // base path of your domain (without)
      clientId: process.env.FB_CLIENT_ID,         // facebook client id
      clientSecret: process.env.FB_CLIENT_SECRET, // facebook client secret
      options: {                                  // any additional params to be sent to provider
        scope: 'user_likes',
      },
    },
  ],
};


// Create plugin with options
const plugin = { register: hapiOauth, options };

// Example route to process data from login
// This is where you may wan to create a web token or cookie
const processLoginRoute = {
  method: 'GET',
  path: '/process-login',
  handler: (req, reply) => reply(req.query),
};


// Create a server, register plugin and add process-login route
const server =
  createServer()
  .then(setConnection({ port: 3000 }))
  .then(registerPlugins([plugin]))
  .then(addRoutes([processLoginRoute]))
  .then(startServer)
  .then(s => console.log(`Server running at: ${s.info.uri}`))
  .catch(err => console.error(err));

module.exports = server;
```
