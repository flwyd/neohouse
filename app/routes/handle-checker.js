import Route from '@ember/routing/route';
import _ from 'lodash';

export default Route.extend({
  model() {
    return this.get('ajax').request('handles')
        .then((result) => _.sortBy(result.data, [(h) => h.name.toLowerCase(), 'entityType']));
  },
});
