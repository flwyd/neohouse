import Controller from '@ember/controller';

const SearchFieldOptions = [
  { value: 'name', label: 'Name' },
  { value: 'callsign', label: 'Callsign' },
  { value: 'email', label: 'Email' },
  { value: 'fka', label: 'Formerly Known As' },
  { value: 'barcode', label: 'Barcode' },
];

export default Controller.extend({
  SearchFieldOptions,

  actions: {
    search(model, isValid) {
      if (!isValid) {
        return;
      }

      const self = this;
      const params = {
        query: model.get('query'),
        search_fields: model.get('search_fields').join(',')
      };

      return this.store.query('person', params).then(function(results) {
        self.set('searchResults', results);
      }).catch((response) => {
        self.handleErrorResponse(response);
      });
    }
  }
});
