
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('status-badge', 'helper:status-badge', {
  integration: true
});

test('it renders active status', function(assert) {
  this.set('status', 'active');

  this.render(hbs`{{status-badge status}}`);

  assert.equal(this.$().html().trim(), '<span class="badge badge-success">active</span>');
});

test('it renders bonked status', function(assert) {
  this.set('status', 'bonked');

  this.render(hbs`{{status-badge status}}`);

  assert.equal(this.$().html().trim(), '<span class="badge badge-danger">bonked</span>');
});
