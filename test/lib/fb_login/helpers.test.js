import test from 'ava';
import { escape } from 'querystring';
import { authQuery, createUri, createRedirectUri } from '../../../lib/fb_login/helpers';

const options = {
  baseUrl: 'https://www.your.base.domain.com',
  clientId: 'your-facebook-client-id',
  authPath: '/path/to/auth/end/point',
};

const expectedQuery =
  `?client_id=your-facebook-client-id&redirect_uri=${escape('https://www.your.base.domain.com/path/to/auth/end/point')}`;


test('authQuery returns a querystring with client_id and redirect_uri', t => {
  t.is(authQuery(options), expectedQuery);
});

test('createUri combines baseUrl, path and query and returns a uri', t => {
  const actual = createUri('https://www.facebook.com', '/dialog/oauth', '?my=querystring&goes=here');
  const expect = 'https://www.facebook.com/dialog/oauth?my=querystring&goes=here';
  t.is(actual, expect);
});

test('createRedirectUri returns a redirect uri', t => {
  const actual = createRedirectUri(options);
  const expected = `https://www.facebook.com/dialog/oauth${expectedQuery}`;
  t.is(actual, expected);
});
