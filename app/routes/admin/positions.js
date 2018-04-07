import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('position', {}).then((result) => { return result.toArray() });
  },

  setupController(controller, model) {
    controller.set('positions', model);
    controller.set('position', null);
  },

  actions: {
    reload() {
      this.refresh();
    }
  }
});
