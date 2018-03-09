import ApplicationAdapter from './application';
import ENV from 'neohouse/config/environment';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    const url = `${ENV['api-server']}/messages`;

    return (id ? url + `/${id}` : url);
  }
});
