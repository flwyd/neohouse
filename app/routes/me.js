import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PersonMixin from 'neohouse/mixins/person';
import RSVP from 'rsvp';
//import { scheduleOnce } from '@ember/runloop';

export default Route.extend(AuthenticatedRouteMixin, PersonMixin, {
  model(params, transition) {
    let person_id =  this.get('session.user.id');

    return RSVP.hash({
      person: this.store.findRecord('person', person_id),
    });
  },

});
