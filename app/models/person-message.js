import DS from 'ember-data';
import { computed } from '@ember/object';
import { memberAction } from 'ember-api-actions';

export default DS.Model.extend({
  person_id:         DS.attr('number'),

  // Only used for creating the message
  recipient_callsign:   DS.attr('string'),

  sender_id:         DS.attr('number'),
  sender_callsign:   DS.attr('string'),

  creator_person_id: DS.attr('number'),
  creator_callsign:  DS.attr('string'),

  subject:           DS.attr('string'),
  body:              DS.attr('string'),
  sent_at:           DS.attr('date'),

  is_read:           DS.attr('boolean'),

  isDictacted: computed('creator_person_id', 'sender_id', function() {
      return (this.get('creator_person_id') != this.get('sender_id'));
  }),

  markRead:           memberAction({ path: 'markread', type: 'patch'})
});
