import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-form/cancel-button', 'Integration | Component | ch form/cancel button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ch-form/cancel-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ch-form/cancel-button}}
      template block text
    {{/ch-form/cancel-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
