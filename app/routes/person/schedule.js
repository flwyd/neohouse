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

    return this.store.query('person-slot', scheduleParams)
        .then((slots) => { model.slots = slots; });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('slots', model.slots);
  }
});
