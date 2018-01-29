import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Object from '@ember/object';

moduleForComponent('ch-form', 'Integration | Component | ch form', {
  integration: true
});

test('it renders a basic form', function(assert) {
  // Template block usage:

  const model = Object.create({ field1: 'something' });

  this.set('model', model);
  this.render(hbs`
    {{#ch-form "someform" model as |f|}}
      Some form text
      {{f.input 'field1' type="text"}}
    {{/ch-form}}
  `);

  const form = this.$('form');
  assert.equal(form.text().trim(), 'Some form text');

  const input = this.$('input[type="text"]');
  assert.equal(input.attr('name'), 'field1');
  assert.equal(input.attr('value'), 'something');
});
