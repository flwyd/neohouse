
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fa-icon', 'helper:fa-icon', {
  integration: true
});

// Replace this with your real tests.
test('it render icons', function(assert) {
  this.render(hbs`{{fa-icon 'clock'}}`);

  assert.equal(this.$('i').attr('class').trim(), 'fas fa-clock');

  this.render(hbs`{{fa-icon 'clock' size='lg'}}`);
  assert.equal(this.$('i').attr('class').trim(), 'fas fa-clock fa-lg');

});
