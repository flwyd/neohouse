import DS from 'ember-data';
import { computed } from '@ember/object';
import { memberAction } from 'ember-api-actions';

export default DS.Model.extend({
  person_id:          DS.attr('number'),

  // Only used for creating the message
  recipient_callsign: DS.attr('string'),

  sender_person_id:   DS.attr('number', { readOnly: true }),
  message_from:       DS.attr('string'),

  creator_person_id:  DS.attr('number', { readOnly: true }),
  creator_callsign:   DS.attr('string', { readOnly: true }),

  subject:            DS.attr('string'),
  body:               DS.attr('string'),
  sent_at:            DS.attr('date'),

  delivered:          DS.attr('boolean', { readOnly: true }),

  isDictacted: computed('creator_person_id', 'sender_person_id', function() {
      return (this.get('creator_person_id') != this.get('sender_person_id'));
  }),

  markRead:           memberAction({ path: 'markread', type: 'patch'})
});
