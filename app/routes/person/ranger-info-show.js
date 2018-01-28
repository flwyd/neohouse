import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(model) {
    // TODO: set year
    return this.store.queryRecord('person-year-info',
         { person_id: model.get('id'), year: 2017 }
       ).then((year_info) => {
         model.set('year_info', year_info);
       });
  },

  setupController(controller, model) {
    controller.set('person', model);
    controller.set('year_info', model.get('year_info'));
  }
});
