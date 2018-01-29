
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('phone-link', 'helper:phone-link', {
  integration: true
});

test('it renders a phone link', function(assert) {
  const phoneNumber = '1-800-BURN-ME';
  this.set('phone', phoneNumber);

  this.render(hbs`{{phone-link phone}}`);

  assert.equal(this.$().html(), `<a href="tel:${phoneNumber}">${phoneNumber}</a>`);
});
