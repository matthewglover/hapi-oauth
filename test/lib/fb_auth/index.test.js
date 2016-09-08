import test from 'ava';
import nock from 'nock';
import url from 'url';
import querystring from 'querystring';
import { createServer, setConnection, addRoutes } from '@matthewglover/hapi-wrapper';
import { USER_TOKEN, USER_DETAILS, AUTH_CONFIG } from './dummy_data';
import provisionInjectPromise from '../../../test_helpers/provision_inject_promise';
import fbAuthenticate from '../../../lib/fb_auth';


// testServer :: [Hapi.Route] -> Promise Hapi.Server Error
const testServer = routes =>
  createServer()
  .then(provisionInjectPromise)
  .then(setConnection())
  .then(addRoutes(routes));

// mockCalls :: Object -> void
const mockCalls = (config) => {
  // Mock out facebook api calls
  const qs = querystring.stringify({
    code: config.code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: `${config.baseUrl}${config.authPath}`,
  });

  nock('https://graph.facebook.com')
    .get(`/v2.7/oauth/access_token?${qs}`)
    .reply(200, USER_TOKEN);

  nock('https://graph.facebook.com')
    .get(`/me?access_token=${USER_TOKEN.access_token}`)
    .reply(200, USER_DETAILS);
};

// Return value expected in redirect uri
const payload = {
  provider: 'facebook',
  name: 'Matthew Glover',
  id: 'facebookid',
  accessToken: 'facebook-access-token',
  tokenType: 'bearer',
  expiresIn: 'timeinsecondstoexpiry',
};

test('fbLogin route works', async t => {
  mockCalls(AUTH_CONFIG);

  const server =
    await testServer([fbAuthenticate(AUTH_CONFIG)]);
  const response =
    await server.injectPromise({ method: 'GET', url: '/fb-auth?code=facebook-code' });

  const { query } = url.parse(response.headers.location);
  const data = querystring.parse(query);

  t.plan(2);
  t.is(response.statusCode, 302);
  t.deepEqual(payload, data);
});
