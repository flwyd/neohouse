import DS from 'ember-data';

export default DS.Model.extend({
  person_id:      DS.attr('number'),
  position_id:    DS.attr('number'),
  position_title: DS.attr('string', { readOnly: true }),
  on_duty:        DS.attr('string'),
  off_duty:       DS.attr('string'),
  duration:       DS.attr('number', { readOnly: true }),
  credits:        DS.attr('number', { readOnly: true })
});
