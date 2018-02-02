import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';

export default Route.extend(PersonMixin, {
  setupController(controller, model) {
    this._super(...arguments);

    const person = model.person;

    return person.retrieveLanguages().then((result) => {
      person.set('languages', result.languages)
    });
  }
});
