import test from 'ava';
import nock from 'nock';
import getUserDetails from '../../../lib/fb_auth/get_user_details';
import { USER_TOKEN, USER_DETAILS, AWFUL_ERROR } from './dummy_data';


nock('https://graph.facebook.com')
  .get(`/me?access_token=${USER_TOKEN.access_token}`)
  .reply(200, USER_DETAILS);

nock('https://graph.facebook.com')
  .get(`/me?access_token=${USER_TOKEN.access_token}`)
  .replyWithError(AWFUL_ERROR);

test.serial('returns a Promise resolving to a user token object', async t => {
  const expected = Object.assign({ provider: 'facebook' }, USER_DETAILS, USER_TOKEN);
  const actual = await getUserDetails(USER_TOKEN);
  t.deepEqual(actual, expected);
});

test.serial('returns a Promise resolving to a user token object', async t => {
  t.plan(2);
  const err = await t.throws(getUserDetails(USER_TOKEN));
  t.is(err, AWFUL_ERROR);
});
