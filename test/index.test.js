import test from 'ava';
import Hapi from 'hapi';
import { createServer, setConnection, registerPlugins } from '@matthewglover/hapi-wrapper';
import HapiOauth from '../';

const server = plugins =>
  createServer()
  .then(setConnection())
  .then(registerPlugins(plugins));

test('plugin loads without error', async t => {
  t.true(await server([{ register: HapiOauth, options: { configs: [] } }]) instanceof Hapi.Server);
});
