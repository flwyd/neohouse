import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PersonMixin from 'neohouse/mixins/person';

export default Route.extend(AuthenticatedRouteMixin, PersonMixin, {
  model(params) {
    let person_id = params.id;

    if (person_id == 'me') {
      person_id = this.get('session.user.id');
    }

    return this.store.findRecord('person', person_id);
  },
});
