import nock from 'nock';
import test from 'ava';
import request from '../../util/request';

const AWFUL_ERROR = { message: 'something awful happened', code: 'AWFUL_ERROR' };

test('request returns a Promise resolving to obj with response and body', async t => {
  nock('http://test.url.com')
    .get('/success')
    .reply(200, 'request body');

  const { response, body } = await request('http://test.url.com/success');

  t.plan(2);
  t.is(response.statusCode, 200);
  t.is(body, 'request body');
});

test('request returns a Promise rejecting with request error', async t => {
  nock('http://test.url.com')
    .get('/fail')
    .replyWithError(AWFUL_ERROR);

  t.plan(2);
  const err = await t.throws(request('http://test.url.com/fail'));
  t.is(err, AWFUL_ERROR);
});
