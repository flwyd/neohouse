import Controller from '@ember/controller';
import * as PersonStatus from 'neohouse/constants/person_status';

const SearchFieldOptions = [
  { value: 'name', label: 'Name' },
  { value: 'callsign', label: 'Callsign' },
  { value: 'email', label: 'Email' },
  { value: 'fka', label: 'Formerly Known As' },
  { value: 'barcode', label: 'Barcode' },
];

const StatusOptions = [
  PersonStatus.ACTIVE,
  PersonStatus.VINTAGE,
  PersonStatus.PROSPECTIVE,
  PersonStatus.PAST_PROSPECTIVE,
  PersonStatus.ALPHA,
  PersonStatus.AUDITOR,

  PersonStatus.INACTIVE,
  PersonStatus.INACTIVE_EXTENSION,
  PersonStatus.BONKED,
  PersonStatus.UBERBONKED,

  PersonStatus.DISMISSED,
  PersonStatus.DECEASED,
  PersonStatus.RESIGNED,
  PersonStatus.RETIRED,
];

export default Controller.extend({
  SearchFieldOptions,

  actions: {
    search(model, isValid) {
      if (!isValid) {
        return;
      }

      const self = this;
      const flash = this.get('flash');
      const params = {
        query: model.get('query'),
        search_fields: model.get('search_fields').join(',')
      };

      flash.clearMessages();

      return this.store.query('person', params).then(function(results) {
        self.set('searchResults', results);
      }).catch((err) => {
        flash.warning('The search could not be performed at this time.', err);
      });
    }
  }
});
