import Route from '@ember/routing/route';
import Object from '@ember/object'

const DefaultSearchFields = [ 'callsign', 'email', 'name' ];

const PersonSearch = Object.extend({
  query: '',
  search_fields: '',
});

export default Route.extend({
  model() {
    return PersonSearch.create({});
  },

  setupController(controller, model) {
    model.set('search_fields', DefaultSearchFields);
    controller.set('searchForm', model);
  }
});
