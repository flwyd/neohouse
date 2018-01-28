import Component from '@ember/component';
import { typeOf } from '@ember/utils';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Component.extend({
  isSubmitted: false,
  validator: null,
  originalModel: null,
  onSubmit: null,
  onReset: null,
  onCancel: null,
  tagName:'',   // prevent component wrapping

  init() {
    this._super(...arguments);

    let model;
    const original = this.get('originalModel');
    const validator = this.get('validator');

    if (validator) {
      model = new Changeset(original, lookupValidator(validator), validator);
    } else {
      model = new Changeset(original);
    }
    this.set('model', model);
  },

  actions: {
    submitForm() {
      const model = this.get('model');
      const original = this.get('originalModel');

      const submitAction = this.get('onSubmit');

      if (model.validate) {
        model.validate().then(() => {
          if (submitAction) {
            return submitAction(model, this.model.get('isValid'), original);
          }
        });
      } else if (submitAction) {
          return submitAction(model, undefined, original);
      }
    },

    resetForm() {
      const model = this.get('model');
      const onReset = this.get('onReset');
      if (onReset) {
        onReset(model)
      } else if (model.rollback) {
        model.rollback();
      }
    },

    cancelForm() {
      const onCancel = this.get('onCancel');

      if (!onCancel) {
        return;
      }

      if (typeOf(onCancel) == 'string') {
        this.send(onCancel, this.get('originalModel'))
      } else {
        onCancel(this.get('originalModel'))
      }
    }
  },

}).reopenClass({
  positionalParams: [ 'formid', 'originalModel' ]
});
