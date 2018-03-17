import Mixin from '@ember/object/mixin';

export default Mixin.create({
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('person', this.get('session.user'));
  }
});
