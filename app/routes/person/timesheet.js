import Route from '@ember/routing/route';
import PersonMixins from 'neohouse/mixins/person';

export default Route.extend(PersonMixins, {
  afterModel(model) {
    const person_id = model.person.get('id');
    const year = model.year;
    return this.store.query('timesheet', { person_id, year }).then((timesheets) => {
      model.timesheets = timesheets;
    }).catch((response) => {
      alert("Failed to retrieve timesheets: "+response);
    })
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('timesheets', model.timesheets);
  }
});
