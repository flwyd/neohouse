import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import PersonMixin from 'neohouse/mixins/person';

const PasswordModel = EmberObject.extend({
  password_new: '',
  password_confirm: ''
});

export default Route.extend(PersonMixin, {
  setupController(controller) {
    this._super(...arguments);
    controller.set('password', PasswordModel.create())
  }
});
