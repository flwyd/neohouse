import Component from '@ember/component';

export default Component.extend({
  tagName:'',   // prevent component wrapping

  didReceiveAttrs() {
    if (!this.get('label')) {
      this.set('label', 'Save');
    }
  }
});
