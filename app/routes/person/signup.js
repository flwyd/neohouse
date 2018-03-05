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
      signups: 1, // *sigh* laravel only take 1 or 0 for booleans as of 5.6
    };

    this.store.unloadAll('schedule');

    return this.store.query('schedule', scheduleParams)
        .then((slots) => { model.slots = slots; })
        .catch((response) => {
          alert("Failed to retrieve slots: "+response);
        });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setup(model);
  }
});
