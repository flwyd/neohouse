
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ch-form/options-builder', 'helper:ch-form/options-builder', {
  integration: true
});

test('it renders html option tags', function(assert) {
  const options = [
    'opt1',
    'opt2',
    'opt3'
  ];

  this.set('options', options);

  this.render(hbs`{{ch-form/options-builder options "opt2"}}`);

  const optionTags = this.$("option");
  assert.equal(optionTags.length, 3);
  assert.equal(optionTags.get(0).innerText, 'opt1');
  assert.equal(optionTags.get(0).getAttribute('selected'), null);

  assert.equal(optionTags.get(1).innerText, 'opt2');
  assert.equal(optionTags.get(1).getAttribute('selected'), 'selected');

  assert.equal(optionTags.get(2).innerText, 'opt3');
  assert.equal(optionTags.get(2).getAttribute('selected'), null);

});
