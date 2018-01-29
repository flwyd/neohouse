
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('meal-info', 'helper:meal-info', {
  integration: true
});

test('it renders meal info', function(assert) {
  this.set('meal', 'pre+event');

  this.render(hbs`{{meal-info meal}}`);

  assert.ok(this.$().text().trim().indexOf('you qualify for three meals/day') !== -1);
});

test('it renders meal info with null value', function(assert) {
  this.set('meal', '');

  this.render(hbs`{{meal-info meal}}`);

  assert.ok(this.$().text().trim().indexOf('Meal Pogs') !== -1);
});

test('it renders meal info with unknown value', function(assert) {
  this.set('meal', 'something-something-darkside');

  this.render(hbs`{{meal-info meal}}`);

  assert.ok(this.$().text().trim().indexOf('Unknown meal type') !== -1);
});
