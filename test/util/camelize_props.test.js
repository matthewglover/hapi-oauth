import test from 'ava';
import camelizeProps from '../../util/camelize_props';

const snake = {
  prop_1: 1,
  prop_two: 2,
  a_longer_prop: 3,
};

const camel = {
  prop1: 1,
  propTwo: 2,
  aLongerProp: 3,
};

test('converts object keys from snake case to camel case', t => {
  t.deepEqual(camelizeProps(snake), camel);
});
