import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import ENV from 'neohouse/config/environment';

import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: ENV['api-server'],
  session: service(),
  headers: computed('session.isAuthenticated', {
    get() {
      let headers = {};
      if (this.get('session.isAuthenticated')) {
        this.get('session').authorize('authorizer:neohouse', (headerName, headerValue) => {
          headers[headerName] = headerValue;
        });
      }
      return headers;
    }
  })
});
