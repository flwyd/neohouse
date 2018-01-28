import EmberObject from '@ember/object';
import NeohouseMixin from 'neohouse/mixins/neohouse';
import { module, test } from 'qunit';

module('Unit | Mixin | neohouse');

// Replace this with your real tests.
test('it works', function(assert) {
  let NeohouseObject = EmberObject.extend(NeohouseMixin);
  let subject = NeohouseObject.create();
  assert.ok(subject);
});
