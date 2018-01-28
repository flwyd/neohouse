import EmberObject from '@ember/object';
import PersonMixin from 'neohouse/mixins/person';
import { module, test } from 'qunit';

module('Unit | Mixin | person');

// Replace this with your real tests.
test('it works', function(assert) {
  let PersonObject = EmberObject.extend(PersonMixin);
  let subject = PersonObject.create();
  assert.ok(subject);
});
