import Component from '@ember/component';

export default Component.extend({
  title: '',
  tagName: '',
}).reopenClass({
  positionalParams: [ 'title' ]
});
