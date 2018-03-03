import DS from 'ember-data';

export default DS.Model.extend({
  person_id:        DS.attr('number'),
  slot_id:          DS.attr('number'),

  position_id:      DS.attr('number', { readOnly: true }),
  position_title:   DS.attr('string', { readOnly: true }),

  slot_begins:      DS.attr('string', { readOnly: true }),
  slot_ends:        DS.attr('string', { readOnly: true }),
  slot_duration:    DS.attr('number', { readOnly: true }),


  slot_description: DS.attr('string', { readOnly: true }),
  slot_signed_up:   DS.attr('number', { readOnly: true }),
  slot_max:         DS.attr('number', { readOnly: true }),
  slot_url:         DS.attr('string', { readOnly: true }),

  credits:          DS.attr('number', { readOnly: true }),
  has_started:      DS.attr('boolean', { readOnly: true }),
  has_ended:        DS.attr('boolean', { readOnly: true }),
  year:             DS.attr('number', { readOnly: true }),

});
