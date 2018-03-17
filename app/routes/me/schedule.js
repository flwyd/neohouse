import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, PersonMixin, {
  queryParams: {
    year: { refreshModel: true }
  },

  model(params) {
    const scheduleParams = {
      person_id: this.get('session.user.id'),
      year: (params.year || (new Date()).getFullYear()),
    };

    // converted to a basic array. Otherwise, ember
    // gets cranky when trying to removeObject() from
    // the collection.
    return RSVP.hash({
      slots: this.store.query('schedule', scheduleParams)
        .then((slots) => { return slots.toArray(); })
        .catch((response) => {
          alert("Failed to retrieve slots: "+response);
        }),
      year: params.year,
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('slots', model.slots);
    controller.set('year', model.year);
    controller.set('viewSchedule',
        (model.year == (new Date()).getFullYear()) ? 'upcoming' : 'all');
  },

  actions: {
    changeYear(year) {
      console.log(`CHANGE YEAR [${year}]`);
      this.transitionTo({ queryParams: { year }})
    }
  }
});
