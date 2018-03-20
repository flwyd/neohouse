import Route from '@ember/routing/route';
import PersonMixins from 'neohouse/mixins/person';

export default Route.extend(PersonMixins, {
  queryParams: {
    year: { refreshModel: true }
  },

  model(params) {
    const queryParams = {
      person_id: this.get('session.user.id'),
      year: (params.year || (new Date).getFullYear()),
    };

    return this.store.query('timesheet', queryParams).catch((response) => {
      alert("Failed to retrieve timesheets: "+response);
    })
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('timesheets', model);
  }
});
