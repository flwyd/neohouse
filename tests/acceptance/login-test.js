import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / redirect to /login', async function(assert) {
    // make sure / redirects to /login
    await visit('/');

    assert.equal(currentURL(), '/login');
  });

  test('successful login', async function(assert) {
    await visit('/login');
    await fillIn('input[name="identification"]', 'active@example.com');
    await fillIn('input[name="password"]', 'ineedashower!');
    await click('button.login-submit');
    assert.equal(currentURL(), '/me/overview');
  });

});
