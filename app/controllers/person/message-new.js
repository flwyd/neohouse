import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import { debounce } from '@ember/runloop';
import RSVP from 'rsvp';

import PersonMessageValidations from 'neohouse/validations/person-message';

export default Controller.extend(ClubhouseControllerMixins, {
  PersonMessageValidations,

  _performSearch(callsign, resolve, reject) {
    return this.get('ajax')
          .request('callsigns', { data: {q: callsign, active: 1} })
          .then((result) => resolve(result.callsigns.map(row => row.callsign)), reject);
  },

  actions: {
    searchCallsign(callsign) {
      return new RSVP.Promise((resolve, reject) => {
        debounce(this, this._performSearch, callsign, resolve, reject, 200);
      });
    },

    submit(model, isValid) {
      this.saveModel(model, isValid, `Message sent to ${model.get('recipient_callsign')}.`, 'person.messages');
    }
  }
});
