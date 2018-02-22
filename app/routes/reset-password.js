import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import Login from 'neohouse/models/login';

export default Route.extend(UnauthenticatedRouteMixin, {
  setupController(controller) {
    this._super(...arguments);
    controller.set('auth', Login.create());
  }
});
