import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    const queryParams = {
        person_id: this.get('session.user.id'),
        year: (params.year || (new Date).getFullYear())
    };

    this.store.unloadAll('access-document');

    return this.store.query('access-document', queryParams)
      .catch((response) => { alert('Failed to retrieve '+response)});
  },

  setupController(controller, model) {
    controller.set('accessDocuments', model);
  }
});
