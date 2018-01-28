import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-box', 'Integration | Component | ch box', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{#ch-box "box title"}}box body{{/ch-box}}`);

  assert.equal(this.$('.card-header').text().trim(), 'box title');
  assert.equal(this.$('.card-body').text().trim(), 'box body');
});
