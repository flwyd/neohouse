
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-form/options-builder', 'helper:ch-form/options-builder', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{ch-form/options-builder inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

