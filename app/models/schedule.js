import DS from 'ember-data';

export default DS.Model.extend({
  // the position row id
  position_id:      DS.attr('number', { readOnly: true }),
  // position title associated with slot
  position_title:   DS.attr('string', { readOnly: true }),

  // slot begin and end times. human formatted
  slot_begins:      DS.attr('string', { readOnly: true }),
  slot_ends:        DS.attr('string', { readOnly: true }),
  // Length in minutes
  slot_duration:    DS.attr('number', { readOnly: true }),

  // Location for training, or period of time (morning, swing, grave)
  slot_description: DS.attr('string', { readOnly: true }),
  // how many people have signed up
  slot_signed_up:   DS.attr('number', { readOnly: true }),
  // sign up limit
  slot_max:         DS.attr('number', { readOnly: true }),
  // set if there's a webpage providing more detail
  // (e.x. particulars about a training location)
  slot_url:         DS.attr('string', { readOnly: true }),

  // Is the person signed up for this slot?
  person_assigned:  DS.attr('boolean', { readOnly: true}),
  // How many trainers are signed up
  trainers:         DS.attr('number', { readOnly: true }),
  // Possible credits earned
  credits:          DS.attr('number', { readOnly: true }),
  // Has the slot started?
  has_started:      DS.attr('boolean', { readOnly: true }),
  // Has the slot eneded?
  has_ended:        DS.attr('boolean', { readOnly: true }),
  // The year this slot occurs
  year:             DS.attr('number', { readOnly: true }),

});
