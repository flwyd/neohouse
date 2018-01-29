import Component from '@ember/component';

export default Component.extend({
  value: '',
  tagName: '',
}).reopenClass({
  positionalParams: [ 'value' ]
});
