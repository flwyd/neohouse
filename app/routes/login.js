import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const LoginModel = EmberObject.extend({identification: null, password: null});

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'person/me/overview',

  setupController(controller) {
    this._super(...arguments);
    controller.set('auth', LoginModel.create());
  }
});
