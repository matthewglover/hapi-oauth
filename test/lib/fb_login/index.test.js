import test from 'ava';
import { createServer, setConnection, addRoutes } from '@matthewglover/hapi-wrapper';
import provisionInjectPromise from '../../../test_helpers/provision_inject_promise';
import fbLogin from '../../../lib/fb_login';

// testServer :: [Hapi.Route] -> Promise Hapi.Server Error
const testServer = routes =>
  createServer()
  .then(provisionInjectPromise)
  .then(setConnection())
  .then(addRoutes(routes));

const urlRegEx =
  /www\.facebook\.com\/dialog\/oauth\?client_id=facebook-client-id&redirect_uri=.+localhost.+fb-auth/;   // eslint-disable-line max-len

const fbLoginConfig = {
  loginPath: '/fb-login',
  authPath: '/fb-auth',
  baseUrl: 'http://localhost',
  clientId: 'facebook-client-id',
  clientSecret: 'facebook-client-secret',
};


test('fbLogin creates route that redirects to facebook with clientId', async t => {
  const testRoute = fbLogin(fbLoginConfig);
  const server = await testServer([testRoute]);
  const reply = await server.injectPromise({ method: 'GET', url: '/fb-login' });

  const redirect = reply.headers.location;

  t.regex(redirect, urlRegEx);
});
