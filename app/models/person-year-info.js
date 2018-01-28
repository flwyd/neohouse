import DS from 'ember-data';

export default DS.Model.extend({
  pesron_id:         DS.attr('number'),
  year:              DS.attr('number'),
  training_passed:   DS.attr('boolean'),
  training_location: DS.attr('string'),
  radio_eligible:    DS.attr('boolean'),
  radio_max:         DS.attr('number'),
  meals:             DS.attr('string'),
  showers:           DS.attr('boolean')
});
