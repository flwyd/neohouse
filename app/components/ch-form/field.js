import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  type: 'text',
  formid: null,

  labelClass: 'form-label',
  controlClass: 'form-control',
  elementErrorClass: 'is-invalid',
  textErrorClass: 'text-danger',
  hintClass: 'form-text text-muted',
  checkboxClass: 'form-check',

  classNameBindings: [ 'wrapClass' ],
  wrapClass: 'form-group',

  tagName: 'div',

  init() {
    if (this.get('noGroup')) {
      this.set('tagName', '');
    }

    this._super(...arguments);
  },

  domId: computed('name', function() {
    return `${this.get('formid')}-${this.get('name')}`
  }),

  // ember-changeset-validate uses model.error (singular)
  // to place validation errors
  error: computed('model.error', function() {
    const error = this.get('model.error');
    return error ? error[this.get('name')] : null;
  }),

  isValid: computed('error', function() {
    return !this.get('error');
  }),

  _val: computed('value', 'model', 'name', function() {
    return this.get('value') || this.get(`model.${this.get('name')}`);
  }),

  actions: {
    update(value) {
      let model = this.get('model');
      model.set(this.get('name'), value);
    }
  }
}).reopenClass({
  positionalParams: [ 'name' ]
});
