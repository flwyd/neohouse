import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { Role } from 'neohouse/constants/roles';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
    const user = this.get('session.user');
    const notify = this.get('notify');

    if (!user || !user.hasRole([Role.EDIT_SLOTS, Role.ADMIN])) {
      notify.danger('You are not authorized.');
      transition.abort();
      this.transition('/me/overview');
      return;
    }
  }
});
