import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    markRead(message) {
      const person = this.get('person');

      return message.markRead().then((result) => {
        message.set('is_read', true);
        person.set('unread_message_count', result.unread);
      })
    }
  }
});
