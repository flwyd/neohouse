import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | person/signup', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:person/signup');
    assert.ok(route);
  });
});
