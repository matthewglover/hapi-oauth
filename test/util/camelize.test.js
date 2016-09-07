import test from 'ava';
import camelize from '../../util/camelize';

test('converts snake case to camel case', t => {
  t.plan(2);
  t.is(camelize('access_token'), 'accessToken');
  t.is(camelize('a_long_snake_case_example'), 'aLongSnakeCaseExample');
});
