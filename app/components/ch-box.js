import Component from '@ember/component';

export default Component.extend({
  tagName:'',   // prevent component wrapping
  css: null,
  type: null,
  icon: null,
  wrapClass: '',

  init() {
    const wrapClass = this.get('wrapClass');
    if (wrapClass) {
      this.set('tagName', 'div');
      this.set('classNames', [ wrapClass ]);
    }

    this._super(...arguments);
  }
}).reopenClass({
  positionalParams: [ 'title' ]
});
