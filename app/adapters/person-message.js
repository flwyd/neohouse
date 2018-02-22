import ApplicationAdapter from './application';
import ENV from 'neohouse/config/environment';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let person_id;

    if (query && query.person_id) {
      person_id = query.person_id;
      delete query.person_id;
    } else {
      person_id = snapshot.attributes().person_id;
    }

    const url = `${ENV['api-server']}/person/${person_id}/messages`;

    return (id ? url + `/${id}` : url);
  }
});
