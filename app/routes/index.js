import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    if (this.session.get('isAuthenticated')) {
      this.transitionTo('/person/me/overview');
    } else {
      this.transitionTo('/login');
    }
  }
});
