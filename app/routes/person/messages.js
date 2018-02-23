import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';

export default Route.extend(PersonMixin, {
  afterModel(model) {
    const person = model.person;
    return this.store.query('person-message', {person_id: person.get('id')}).then((messages) => {
      model.messages = messages;
    })
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('messages', model.messages);
  }
});
