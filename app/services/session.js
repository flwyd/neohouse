import {inject as service} from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';
import {resolve, reject} from 'rsvp';

export default SessionService.extend({
  store: service(),

  isCurrentPerson(person) {
    let thisUser = this.get('user');
    return (thisUser && thisUser.get('id') == person.get('id'));
  },

  loadUser() {
    if (this.get('isAuthenticated')) {
      return (
        this.get('store').findRecord('person',
          this.get('session.authenticated.person_id')).then(user => {
            this.set('user', user);
          }).catch(e => {
            this.invalidate();
            return reject(e);
          })
      );
    } else {
      // This needs to return a resolved promise because beforeModel in
      // ember-simple-auth application route mixin needs a resolved promise.
      return resolve();
    }
  }
});
