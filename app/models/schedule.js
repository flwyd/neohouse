import DS from 'ember-data';
import { computed } from 'ember-decorators/object';
import moment from 'npm:moment';

export default DS.Model.extend({
  // the position row id
  position_id:      DS.attr('number', { readOnly: true }),
  // position title associated with slot
  position_title:   DS.attr('string', { readOnly: true }),
  // position type
  position_type:    DS.attr('string', { readOnly: true }),

  // slot begin and end times. human formatted
  slot_begins:      DS.attr('string', { readOnly: true }),
  slot_ends:        DS.attr('string', { readOnly: true }),

  // slot begin & ends time in UNIX seconds
  slot_begins_time:  DS.attr('number', { readOnly: true }),
  slot_ends_time:    DS.attr('number', { readOnly: true }),

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

  @computed('slot_signed_up', 'slot_max')
  get isFull() {
    return (this.get('slot_signed_up') >= this.get('slot_max'));
  },

  @computed('slot_begins')
  get slotDay() {
    const begins = this.get('slot_begins');
    let date;
    try {
      date = moment(begins).format('YYYY-MM-DD');
    } catch (error) {
      return begins + ' '+error;
    }

    return date;
  },

  // Check to see if the url is just a url and nothing else
  @computed('slot_url')
  get infoIsUrl() {
    const url = this.get('slot_url');

    if (!url) {
      return false;
    }

    if (/^(https?:\/\/[^\s]+)$/.exec(url)) {
      return true;
    }

    return false;
  }
});
