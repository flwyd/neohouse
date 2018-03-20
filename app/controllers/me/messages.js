import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import {computed} from 'ember-decorators/object';

export default Controller.extend(ClubhouseControllerMixins, {
  filterMessages: 'all',

  @computed('messages', 'filterMessages')
  get viewMessages() {
    const messages = this.get('messages');
    const filterMessages = this.get('filterMessages');

    switch (filterMessages) {
      case 'read':
        return messages.filterBy('delivered', true);

      case 'unread':
        return messages.filterBy('delivered', false);

      default:
        return messages;
    }

  },

  @computed('messages')
  get unreadCount() {
    return this.get('messages').reduce(function(total, msg) { return (msg.get('delivered') ? 0 : 1)+total;}, 0);
  },

  @computed('messages')
  get readCount() {
    return this.get('messages').reduce(function(total, msg) { return (msg.get('delivered') ? 1 : 0)+total;},0);
  },

  actions: {
    markRead(message) {
      const person = this.get('person');

      return message.markRead().then(() => {
        message.set('delivered', true);
        person.set('unread_message_count', person.get('unread_message_count') - 1);
      })
    }
  }
});
