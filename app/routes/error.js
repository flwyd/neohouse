import Route from '@ember/routing/route';

//
// Called by Ember when a route encounters an uncaught exception.
//
// Note this is *not* listed in app/router.js

export default Route.extend({
  setupController: function(controller, error) {
    this._super(...arguments);
    console.error('Uncaught routing exception', error.message);
    controller.set('error', error);
  }
});
