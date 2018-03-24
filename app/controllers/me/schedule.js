import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';

export default Controller.extend(ClubhouseControllerMixins, {
  queryParams: [ 'year' ],

  actions: {
    changeYear(year) {
      this.set('year', year);
    },
  }
});
