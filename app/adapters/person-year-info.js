import ApplicationAdapter from './application';
import ENV from 'neohouse/config/environment';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    const { person_id, year } = query;
    delete query.person_id;
    delete query.year; // eslint-disable-line no-param-reassign

    return `${ENV['api-server']}/person/${person_id}/yearinfo/${year}`;
  }
});
