import Component from '@ember/component';

export default Component.extend({
  message: '',
}).reopenClass({
  positionalParams: [ 'message' ]
});
;
