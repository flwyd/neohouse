import Controller from '@ember/controller';
import { debounce } from '@ember/runloop';
import RSVP from 'rsvp';

import PersonMessageValidations from 'neohouse/validations/person-message';

export default Controller.extend({
  PersonMessageValidations,

  _performSearch(callsign, resolve, reject) {
    return this.get('ajax')
          .request('callsigns', { data: {q: callsign, active: true} })
          .then((result) => resolve(result.callsigns.map(row => row.callsign)), reject);
  },

  actions: {
    searchCallsign(callsign) {
      return new RSVP.Promise((resolve, reject) => {
        debounce(this, this._performSearch, callsign, resolve, reject, 200);
      });
    },

    submit(model, isValid, originalModel) {
      if (!isValid) {
        return;
      }

      const flash = this.get('flash');
      const person = this.get('person');
      const self = this;

      flash.clearMessages();

      // Hacker here - person_id is used to build the URL up
      // based on the sender, not recipient. This will be
      // correctly set on the server side.
      model.set('person_id', person.get('id'));

      return model.save().then(function() {
        flash.success(`The message was sent to ${model.get('recipient_callsign')}.`);
        self.transitionToRoute('person.messages', person.get('id'));
      }).catch(function () {
        originalModel.get('errors').forEach((error) => {
          model.pushErrors(error.attribute,  error.message);
        });
        flash.warning('The message was not sent due to errors.');
      })
    }
  }
});
