import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import {computed} from '@ember/object';

export default Controller.extend(ClubhouseControllerMixins, {
  filterMessages: 'all',

  viewMessages: computed('messages', 'filterMessages', function() {
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

  }),

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
