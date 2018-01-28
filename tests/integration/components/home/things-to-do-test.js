import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('home/things-to-do', 'Integration | Component | home/things to do', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{home/things-to-do}}`);

  assert.ok(this.$().text().trim().indexOf('Things To Do') != -1);
});
