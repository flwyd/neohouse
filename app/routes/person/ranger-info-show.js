import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(model) {
    return this.store.queryRecord('person-year-info',
         { person_id: model.person.get('id'), year: model.year }
       ).then((year_info) => {
         model.year_info = year_info;
       });
  },

  setupController(controller, model) {
    controller.set('person', model.person);
    controller.set('year_info', model.year_info);
  }
});
