import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  iconType: 'r',
  tagName: '',
  tagClass: 'bg-dark list-group-item list-group-item-action',

  @computed('routePath')
  isUrl() {
    const url = this.get('routePath');

    if (url == '') {
      return false;
    }

    return (url == '#' || url.startsWith('http'));
  },
}).reopenClass({
  positionalParams: [ 'routePath', 'routeArg' ]
});
