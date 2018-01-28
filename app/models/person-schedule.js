import DS from 'ember-data';

export default DS.Model.extend({
  person_id:           DS.attr('number'),

  position_id:         DS.attr('number'),
  position_title:      DS.attr('string'),

  slot_begins:         DS.attr('string'),
  slot_begins_display: DS.attr('string'),

  slot_ends:           DS.attr('string'),
  slot_ends_display:   DS.attr('string'),

  slot_description:    DS.attr('string'),
  slot_signed_up:      DS.attr('number'),
  slot_max:            DS.attr('number'),
  slot_url:            DS.attr('string'),

  credits:             DS.attr('number'),
});
