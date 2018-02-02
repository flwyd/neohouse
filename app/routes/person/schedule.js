import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import PersonMixin from 'neohouse/mixins/person';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, PersonMixin, {
  model(params) {
    const flash = this.flash;
    const model = this.modelFor('person');
    const person = model.person;
    const year = model.year;

    const scheduleParams = {
      person_id: person.get('id'),
      year,
    };

    console.log(`Schedule model year[${year}] person_id[${person.get('id')}]`);

    return RSVP.hash({
      slots: this.store.query('person-schedule', scheduleParams),
      person: model.person,
      year: year,
      });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('slots', model.slots);
    controller.set('year', model.year);
  }
});
