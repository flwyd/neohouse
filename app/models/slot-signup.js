import DS from 'ember-data';

export default DS.Model.extend({
  person_id:      DS.attr('number'),
  callsign:       DS.attr('string'),
  position_id:    DS.attr('number'),
  position_title: DS.attr('string'),
});
