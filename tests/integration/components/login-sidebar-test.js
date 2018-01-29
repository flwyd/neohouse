import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-sidebar', 'Integration | Component | login sidebar', {
  integration: true
});

test('it renders the login sidebar', function(assert) {
  this.render(hbs`{{login-sidebar}}`);

  assert.ok(this.$().text().trim().indexOf('Register') !== -1);
});
