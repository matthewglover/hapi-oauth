import test from 'ava';
import nock from 'nock';
import url from 'url';
import querystring from 'querystring';
import { createServer, setConnection, addRoutes } from '@matthewglover/hapi-wrapper';
import { USER_TOKEN, USER_DETAILS } from './dummy_data';
import provisionInjectPromise from '../../../test_helpers/provision_inject_promise';
import signJWT from '../../../util/sign_jwt';
import fbAuthenticate from '../../../lib/fb_auth';


// testServer :: [Hapi.Route] -> Promise Hapi.Server Error
const testServer = routes =>
  createServer()
  .then(provisionInjectPromise)
  .then(setConnection())
  .then(addRoutes(routes));

const config = {
  code: 'facebook-code',
  loginPath: '/fb-login',
  authPath: '/fb-auth',
  baseUrl: 'localhost',
  clientId: 'facebook-client-id',
  clientSecret: 'facebook-secret',
  generateToken: signJWT({ algorithm: 'HS256', noTimestamp: true }, 'my-secret'),
};

const qs = querystring.stringify({
  code: config.code,
  client_id: config.clientId,
  client_secret: config.clientSecret,
  redirect_uri: `${config.baseUrl}${config.authPath}`,
});

const payload = {
  provider: 'facebook',
  name: 'Matthew Glover',
  id: 'facebookid',
  accessToken: 'facebook-access-token',
  tokenType: 'bearer',
  expiresIn: 'timeinsecondstoexpiry',
};

nock('https://graph.facebook.com')
  .get(`/v2.7/oauth/access_token?${qs}`)
  .reply(200, USER_TOKEN);

nock('https://graph.facebook.com')
  .get(`/me?access_token=${USER_TOKEN.access_token}`)
  .reply(200, USER_DETAILS);

test('fbLogin route works', async t => {
  const server =
    await testServer([fbAuthenticate(config)]);
  const response =
    await server.injectPromise({ method: 'GET', url: '/fb-auth?code=facebook-code' });

  const { query } = url.parse(response.headers.location);
  const { jwt } = querystring.parse(query);

  t.plan(2);
  t.is(response.statusCode, 302);
  t.is(jwt, await config.generateToken(payload));
});
