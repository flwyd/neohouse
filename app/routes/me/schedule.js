import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, PersonMixin, {
  afterModel(model) {
    const person = model.person;
    const year = model.year;

    const scheduleParams = {
      person_id: person.get('id'),
      year,
    };

    //
    // Note, since ED is being used to do the heavy
    // lifting for the query, and ajax calls are
    // used to do the deletion, the result needs to be
    // converted to a basic array. Otherwise, ember
    // gets cranky when trying to removeObject() from
    // the collection.
    return this.store.query('schedule', scheduleParams)
        .then((slots) => { model.slots = slots.toArray(); })
        .catch((response) => {
          alert("Failed to retrieve slots: "+response);
        });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('slots', model.slots);

    controller.set('viewSchedule',
        (model.year == (new Date()).getFullYear()) ? 'upcoming' : 'all');
  }
});
