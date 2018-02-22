import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  iconType: 'r',
  tagName: '',
  tagClass: 'bg-dark list-group-item list-group-item-action',

  isUrl: computed('routePath', function() {
    const url = this.get('routePath');

    if (url == '') {
      return false;
    }

    return (url == '#' || url.startsWith('http'));
  })
}).reopenClass({
  positionalParams: [ 'routePath', 'routeArg' ]
});
