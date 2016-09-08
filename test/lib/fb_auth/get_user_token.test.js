import test from 'ava';
import nock from 'nock';
import querystring from 'querystring';
import getUserToken from '../../../lib/fb_auth/get_user_token';
import { USER_TOKEN, AWFUL_ERROR, AUTH_CONFIG } from './dummy_data';


const qs = querystring.stringify({
  code: AUTH_CONFIG.code,
  client_id: AUTH_CONFIG.clientId,
  client_secret: AUTH_CONFIG.clientSecret,
  redirect_uri: `${AUTH_CONFIG.baseUrl}${AUTH_CONFIG.authPath}`,
});

nock('https://graph.facebook.com')
  .get(`/v2.7/oauth/access_token?${qs}`)
  .reply(200, USER_TOKEN);

nock('https://graph.facebook.com')
  .get(`/v2.7/oauth/access_token?${qs}`)
  .replyWithError(AWFUL_ERROR);

test.serial('returns a Promise which resolves to a user token object', async t => {
  t.deepEqual(await getUserToken(AUTH_CONFIG), USER_TOKEN);
});

test.serial('returns a Promise which resolves to a user token object', async t => {
  t.plan(2);
  const err = await t.throws(getUserToken(AUTH_CONFIG));
  t.is(err, AWFUL_ERROR);
});
