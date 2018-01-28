import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';

export default Route.extend(PersonMixin, {

  afterModel(model) {
      return this.store.query('person-message', { person_id: model.get('id') }).then((messages) => {
        model.set('messages', messages)
      })
  }
});
