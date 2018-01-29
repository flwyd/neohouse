import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('present-or-not', 'Integration | Component | present or not', {
  integration: true
});

test('it renders a present value', function(assert) {
  this.set('value', 'something');

  this.render(hbs`{{present-or-not value}}`);

  assert.equal(this.$().text().trim(), 'something');
});

test('it renders a not present/empty value', function(assert) {
  this.set('value', '');

  this.render(hbs`{{present-or-not value}}`);

  assert.equal(this.$().html().trim(), '<i>not given</i>');
});
