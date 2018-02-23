import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';

export default Controller.extend(ClubhouseControllerMixins, {

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
