import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-form/submit', 'Integration | Component | ch form/submit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ch-form/submit submitAction='action' label="Submit It"}}`);
  const button = this.$('button');

  assert.equal(button.length, 1);
  assert.equal(button.attr('type'), 'submit');
  assert.equal(button.text(), 'Submit It')
});
