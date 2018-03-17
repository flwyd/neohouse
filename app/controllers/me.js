import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'year' ],
  year: null,

  actions: {
    changeYear(year) {
      //console.log("Changing year to "+year);
    // Bubble up to route
      //this.set('year', year);
      this.transitionToRoute({ queryParams: { year }})
    }
  }
});
