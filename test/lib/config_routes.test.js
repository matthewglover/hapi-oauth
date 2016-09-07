import test from 'ava';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const loginFBStub = sinon.stub().returns('fbLoginStub');
const authFBStub = sinon.stub().returns('fbAuthStub');

const configRoutes =
  proxyquire('../../lib/config_routes', {
    './fb_login': loginFBStub,
    './fb_auth': authFBStub,
  });

test('configRoutes returns empty array when called with unhandled provider', t => {
  t.deepEqual(configRoutes({ provider: 'unhandled' }), []);
});

test('configRoutes returns facebook array when called with unhandled provider', t => {
  t.deepEqual(configRoutes({ provider: 'facebook' }), ['fbLoginStub', 'fbAuthStub']);
});
