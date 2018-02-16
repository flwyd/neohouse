import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  afterModel(model) {
    const person_id = model.person.get('id');
    const year = model.year;

    return this.get('ajax').request('person/'+person_id+'/yearinfo/'+year)
       .then((result) => {
         model.year_info = EmberObject.create(result.year_info);
       }).catch((err) => {
         alert("Could not retrieve ranger year info "+err);
       });
  },

  setupController(controller, model) {
    controller.set('person', model.person);
    controller.set('year_info', model.year_info);
  }
});
