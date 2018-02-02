import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'year' ],
  year: '',

  actions: {
    changeYear(year) {
      console.log("Changing year to "+year);
    // Bubble up to route
      this.set('year', year);
    //  this.transitionToRoute({ queryParams: { year }, refreshModel: true});
    //  this.send('refreshRoute');
    }
  }
});
