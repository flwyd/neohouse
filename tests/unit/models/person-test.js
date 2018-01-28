import { moduleForModel, test } from 'ember-qunit';

moduleForModel('person', 'Unit | Model | person', {
  // Specify the other units that are required for this test.
  needs: []
});

test('have_roles should work', function(assert) {
  let model = this.subject({ roles: [3,4] });
  assert.equal(model.have_role(3), true, 'role have');
  assert.equal(model.have_role(2), false, 'role have not');
});
