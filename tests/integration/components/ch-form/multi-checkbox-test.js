import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-form/multi-checkbox', 'Integration | Component | ch form/multi checkbox', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ch-form/multi-checkbox}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ch-form/multi-checkbox}}
      template block text
    {{/ch-form/multi-checkbox}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
