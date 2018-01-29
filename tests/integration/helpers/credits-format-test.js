import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('credits-format', 'helper:credits-format', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('credits', 12);

  this.render(hbs`{{credits-format credits}}`);

  assert.equal(this.$().text().trim(), '12.00');
});
