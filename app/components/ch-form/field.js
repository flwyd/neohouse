import Component from '@ember/component';
import {computed} from 'ember-decorators/object';

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

  @computed('name')
  get domId() {
    return `${this.get('formid')}-${this.get('name')}`
  },

  // ember-changeset-validate uses model.error (singular)
  // to place validation errors
  @computed('model.error')
  get error() {
    const error = this.get('model.error');
    return error ? error[this.get('name')] : null;
  },

  @computed('error')
  get isValid() {
    return !this.get('error');
  },

  @computed('value', 'model', 'name')
  get _val() {
    return this.get('value') || this.get(`model.${this.get('name')}`);
  },

  actions: {
    update(value) {
      this.get('model').set(this.get('name'), value);
    }
  }
}).reopenClass({
  positionalParams: [ 'name' ]
});
