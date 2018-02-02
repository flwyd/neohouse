import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-sidebar-link', 'Integration | Component | ch sidebar link', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ch-sidebar-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ch-sidebar-link}}
      template block text
    {{/ch-sidebar-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
