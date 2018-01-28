import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'neohouse/config/environment';
import Ember from 'ember';

export default Route.extend(ApplicationRouteMixin, {
  beforeModel(transition) {
    this._super(...arguments);

    // If heading to the offline target, simply return
    if (transition.targetName == 'offline')
      return;

    // Has the app configuration been loaded?
    if (ENV['neoConfig']) {
      return this.setCurrentUser();
    }

    // Fetch the configuration
    return Ember.$.get(`${ENV['api-server']}/configs`).then((result) => {
      ENV['neoConfig'] = result;
      return this.setCurrentUser();
    }).catch(() => {
      // Can't retrieve the configuration. Consider the application
      // offline for the moment.
      transition.abort();
      this.transitionTo("offline");
    });
  },

  // Logout button or ember-simple-auth trigger
  invalidateSession() {
    this.get('session').invalidate();
  },

  sessionAuthenticated() {
    this._super(...arguments);

    return this.setCurrentUser().then(() => {
      this.transitionTo('/person/me/overview');
    });
  },

  setCurrentUser() {
    return this.get('session').loadUser().catch(() => {
      this.transitionTo('/login');
    });
  },

  setupController(controller) {
    controller.set('user', this.get('session.user'))
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
