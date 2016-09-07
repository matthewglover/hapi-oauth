import test from 'ava';
import nock from 'nock';
import querystring from 'querystring';
import getUserToken from '../../../lib/fb_auth/get_user_token';
import { USER_TOKEN, AWFUL_ERROR } from './dummy_data';


const config = {
  code: 'fb-code',
  loginPath: '/fb-login',
  authPath: '/fb-auth',
  baseUrl: 'localhost',
  clientId: 'facebook-client-id',
  clientSecret: 'facebook-secret',
};

const qs = querystring.stringify({
  code: config.code,
  client_id: config.clientId,
  client_secret: config.clientSecret,
  redirect_uri: `${config.baseUrl}${config.authPath}`,
});

nock('https://graph.facebook.com')
  .get(`/v2.3/oauth/access_token?${qs}`)
  .reply(200, USER_TOKEN);

nock('https://graph.facebook.com')
  .get(`/v2.3/oauth/access_token?${qs}`)
  .replyWithError(AWFUL_ERROR);

test.serial('returns a Promise which resolves to a user token object', async t => {
  t.deepEqual(await getUserToken(config), USER_TOKEN);
});

test.serial('returns a Promise which resolves to a user token object', async t => {
  t.plan(2);
  const err = await t.throws(getUserToken(config));
  t.is(err, AWFUL_ERROR);
});
