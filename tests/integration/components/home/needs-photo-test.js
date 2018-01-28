import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('home/needs-photo', 'Integration | Component | home/needs photo', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{home/needs-photo}}`);

  assert.ok(this.$().text().trim().indexOf('Your Photo Is Needed') != -1);
});
