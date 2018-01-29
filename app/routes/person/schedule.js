import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, PersonMixin, {
  afterModel(model) {
    const flash = this.get('flash');

    // TODO: add year
    const params = {
      person_id: model.get('id'),
      year: 2017
    };

    return this.store.query('person-schedule', params)
        .then((slots) => {
          model.set('slots', slots)
          model.set('year', params.year)
        }).catch((err) => {
          flash.warning('The schedule could not be retrieved.', err)
        })
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('slots', model.get('slots'));
    controller.set('year', model.get('year'));
  }
});
