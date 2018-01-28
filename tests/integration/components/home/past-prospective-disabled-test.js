import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('home/past-prospective-disabled', 'Integration | Component | home/past prospective disabled', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{home/past-prospective-disabled}}`);
  assert.ok(this.$('div.card_header').text().trim().indexOf('Account Is Inactive'));
});
