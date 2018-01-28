import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Object from '@ember/object';

moduleForComponent('ch-form', 'Integration | Component | ch form', {
  integration: true
});

test('it renders a basic form', function(assert) {
  // Template block usage:

  const model = Object.create({ });

  this.set('model', model);
  this.render(hbs`
    {{#ch-form "someform" model}}
      Some form text
    {{/ch-form}}
  `);

  assert.equal(this.$('form').text().trim(), 'Some form text');

});
