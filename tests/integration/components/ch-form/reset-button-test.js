import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-form/reset-button', 'Integration | Component | ch form/reset button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ch-form/reset-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ch-form/reset-button}}
      template block text
    {{/ch-form/reset-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
