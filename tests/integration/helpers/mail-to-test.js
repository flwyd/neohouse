
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mail-to', 'helper:mail-to', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('email', 'dangerranger@ranger.bm');

  this.render(hbs`{{mail-to email}}`);

  assert.equal(this.$().html(), '<a href="mailto:dangerranger@ranger.bm">dangerranger@ranger.bm</a>');
});
