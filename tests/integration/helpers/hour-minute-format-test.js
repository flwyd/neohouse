import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hour-minute-format', 'helper:hour-minute-format', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{hour-minute-format inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
