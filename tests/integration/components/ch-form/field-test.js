import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Object from '@ember/object';

moduleForComponent('ch-form/field', 'Integration | Component | ch form/field', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const model = Object.create({
    textfield: "Hi There"
  });

  this.set('model', model);
  this.render(hbs`{{ch-form/field "textname" type="text" model=model label="A Label"}}`);

  const input = this.$('input[type="text"]');

  assert.ok(input, "Text field present");
  assert.equal(this.$().text().trim(), 'A Label', "label text should be present");

});
