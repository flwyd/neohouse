import DS from 'ember-data';

export default DS.Model.extend({
  callsign:     DS.attr('string'),
  status:       DS.attr('string')
});
