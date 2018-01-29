
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('badge', 'helper:badge', {
  integration: true
});

test('it renders default', function(assert) {
  this.set('inputValue', 'active');

  this.render(hbs`{{badge inputValue}}`);

  assert.equal(this.$().html, '<span class="badge badge-success">active</span>');
});

// Replace this with your real tests.
test('it renders type', function(assert) {
  this.set('inputValue', 'active');

  this.render(hbs`{{badge inputValue type="danger"}}`);

  assert.equal(this.$().html, '<span class="badge badge-danger">active</span>');
});
