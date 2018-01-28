import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';

export default Route.extend(PersonMixin, {
  setupController(controller, model) {
    this._super(...arguments);

    return model.retrieveLanguages().then((result) => {
      model.set('languages', result.languages)
    });
  }
});
