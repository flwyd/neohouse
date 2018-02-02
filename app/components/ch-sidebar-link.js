import Component from '@ember/component';

export default Component.extend({
  routePath: '',
  routeArg: '',
  icon: '',
  iconType: 'r',
  badgeText: ''
}).reopenClass({
  positionalParams: [ 'routePath', 'routeArg' ]
});
