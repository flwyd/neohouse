import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import jQuery from 'jquery';

moduleForComponent('person-sidebar', 'Integration | Component | person sidebar', {
  integration: true,

  beforeEach() {
    // stub the bootstrap collapse function
    jQuery.fn.extend({
      collapse() { }
    });
  }
});

test('it renders person sidebar without message count', function(assert) {
  const personStub = {
    id: 999,
    unread_message_count: 0
  };

  this.set('person', personStub);
  this.render(hbs`{{person-sidebar person=person}}`);

  const message = this.$('span:contains("Messages")');
  // the message should not have a badge with the message count
  assert.equal(message.find('span').text(), '');
});

test('it renders person sidebar with message count', function(assert) {
  const personStub = {
    id: 999,
    unread_message_count: 123
  };

  this.set('person', personStub);
  this.render(hbs`{{person-sidebar person=person}}`);

  const message = this.$('span:contains("Messages")');
  // the message should have a badge with the message count
  assert.ok(message.find('span:contains("123")').text().trim(), '123');
});
