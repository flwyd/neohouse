import Mixin from '@ember/object/mixin';

export default Mixin.create({
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('person', model.person);
    controller.set('year', model.year);
  }
});
