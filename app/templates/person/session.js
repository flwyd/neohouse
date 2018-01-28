import {inject as service} from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';
import {resolve, reject} from 'rsvp';

export default SessionService.extend({
  store: service(),

  loadUser() {
    if (this.get('isAuthenticated')) {
      return (
        this.get('store').findRecord('person', this.get('session.authenticated.user_id'))
          .then(user => {
            this.set('user', user);
          })
          // This catch will be triggered if the findRecord or set currentUser
          // fails. If we don't have a user, the site will be very broken
          // so kick them out.
          .catch(e => {
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
