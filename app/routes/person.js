import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PersonMixin from 'neohouse/mixins/person';
import RSVP from 'rsvp';
//import { scheduleOnce } from '@ember/runloop';

export default Route.extend(AuthenticatedRouteMixin, /*PersonMixin,,*/ {
  queryParams: {
    year: { refreshModel: true }
  },

  model(params, transition) {
    let person_id = params.person_id;
    let year = transition.queryParams.year;

    if (person_id == 'me') {
      person_id = this.get('session.user.id');
    }

    if (!year) {
      year = (new Date()).getFullYear();
    }
    console.log(`model loading person year ${year}`)
    return RSVP.hash({
      person: this.store.findRecord('person', person_id),
      year: year,
    });
  },

  setupController(controller, model) {
    controller.set('person', model.person);
  },

/*  actions: {
    queryParamsDidChange() {
      const self = this;
      console.log("ACTION query parameter did changte")
      /*this.refresh();*/
/*      scheduleOnce('actions', function () {
        self.refresh();
      });
    }
  }*/
});
