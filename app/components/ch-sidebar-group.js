import Component from '@ember/component';

export default Component.extend({
  title: ''
}).reopenClass({
  positionalParams: [ 'title' ]
});