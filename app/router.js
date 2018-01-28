import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    this._super(...arguments);
    if (!this.get('fastboot.isFastBoot')) {
      window.scrollTo(0,0);
    }
  }
});

Router.map(function() {
  this.route('login');
  this.route('offline');
  this.route('person', { path: '/person/:id' }, function() {
    this.route('overview');
    this.route('ranger-info-show');
    this.route('personal-info-show');
    this.route('personal-info-edit');
    this.route('emergency-contact-show');
    this.route('emergency-contact-edit');
    this.route('password');
    this.route('messages');
    this.route('message-new');
    this.route('schedule');
  });

});

export default Router;
