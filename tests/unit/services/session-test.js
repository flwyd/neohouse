import { moduleFor, test } from 'ember-qunit';
import Object from '@ember/object';

moduleFor('service:session', 'Unit | Service | session', {
   needs: ['model:person', 'service:flashMessages' ]
});

test('isCurrentPerson should work', function(assert) {
  const service = this.subject();

  const currentPerson = Object.create({ id: 999 });
  const testPerson = Object.create({ id: 999 });

  service.set('isAuthenticated', true);
  service.set('user', currentPerson);
  assert.ok(service.isCurrentPerson(testPerson));
});

test('isCurrentPerson should fail', function(assert) {
  const service = this.subject();

  const currentPerson = Object.create({ id: 999 });
  const testPerson = Object.create({ id: 888 });

  service.set('isAuthenticated', true);
  service.set('user', currentPerson);
  assert.ok(!service.isCurrentPerson(testPerson));
});
