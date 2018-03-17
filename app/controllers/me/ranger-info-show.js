import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'year' ],

  actions: {
    changeYear(year) {
      this.set('year', year);
    }
  }
});
