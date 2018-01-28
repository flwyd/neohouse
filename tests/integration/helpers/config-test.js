import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'neohouse/config/environment';

moduleForComponent('config', 'helper:config', {
  integration: true
});

// Replace this with your real tests.
test('it should find config', function(assert) {
  if (!ENV['neoConfig'])
    ENV['neoConfig'] = {}

  ENV['neoConfig'].parent = 'rick';

  this.render(hbs`{{config 'parent'}}`);

  assert.equal(this.$().text().trim(), 'rick');
});

test('it should not find config', function(assert) {
  if (!ENV['neoConfig'])
    ENV['neoConfig'] = {}

  delete ENV['neoConfig']['parent'];

  this.render(hbs`{{config 'parent'}}`);
  assert.equal(this.$().text(), '');
});
