import DS from 'ember-data';
import { computed } from '@ember/object';
import { memberAction } from 'ember-api-actions';

import * as PersonStatus from 'neohouse/constants/person_status';

export default DS.Model.extend({
  first_name:         DS.attr('string'),
  mi:                 DS.attr('string'),
  last_name:          DS.attr('string'),
  email:              DS.attr('string'),
  callsign:           DS.attr('string'),
  callsign_approved:  DS.attr('boolean'),
  formerly_known_as:  DS.attr('string'),
  status:             DS.attr('string'),
  status_date:        DS.attr('date'),
  user_authorized:    DS.attr('boolean'),
  date_verified:      DS.attr('date'),
  create_date:        DS.attr('date'),
  active_next_event:  DS.attr('boolean'),
  on_site:            DS.attr('boolean'),

  roles:              DS.attr(''),

  // Personal Information
  street1:            DS.attr('string'),
  street2:            DS.attr('string'),
  apt:                DS.attr('string'),
  city:               DS.attr('string'),
  state:              DS.attr('string'),
  zip:                DS.attr('string'),
  country:            DS.attr('string'),
  home_phone:         DS.attr('string'),
  alt_phone:          DS.attr('string'),

  camp_location:      DS.attr('string'),
  gender:             DS.attr('string'),
  birthdate:          DS.attr('date'),

  longsleeveshirt_size_style: DS.attr('string'),
  teeshirt_size_style:        DS.attr('string'),


  // Emergency contact

  emergency_contact:           DS.attr('string'),
  em_first_name:               DS.attr('string'),
  em_mi:                       DS.attr('string'),
  em_last_name:                DS.attr('string'),
  em_handle:                   DS.attr('string'),
  em_home_phone:               DS.attr('string'),
  em_alt_phone:                DS.attr('string'),
  em_email:                    DS.attr('string'),
  em_camp_location:            DS.attr('string'),

  barcode:                     DS.attr('string'),
  asset_authorized:            DS.attr('boolean'),
  vehicle_blacklisted:         DS.attr('boolean'),
  vehicle_paperwork:           DS.attr('boolean'),
  vehicle_insurance_paperwork: DS.attr('boolean'),
  lam_status:                  DS.attr('string'),
  bpguid:                      DS.attr('string'),
  sfuid:                       DS.attr('string'),

  mentors_flag:                DS.attr('boolean'),
  mentors_flag_note:           DS.attr('string'),
  mentors_notes:               DS.attr('string'),
  has_note_on_file:            DS.attr('boolean'),

  timestamp:                   DS.attr('date'),

  // a seperate table the database and not
  // filled in when retrieving the person
  // however updated thru here.
  languages:                   DS.attr('string'),


  // Read only - computed properties

  years_rangered:               DS.attr('', { readOnly: true}),
  unread_message_count:         DS.attr('number', { readOnly: true}),

  // Computed methods

  isPastProspectiveDisabled: computed('status', 'callsign_approved', function() {
      return (this.get('status') == PersonStatus.PAST_PROSPECTIVE && !this.get('callsign_approved'));
  }),

  isRanger: computed('status', function() {
    const status = this.get('status');

    return (status == PersonStatus.ACTIVE
          || status == PersonStatus.VINTAGE
          || status == PersonStatus.AUDITOR);
  }),

  isAlpha: computed('status', function() {
    return (status == PersonStatus.ALPHA)
  }),

  isAuditor: computed('status', function() {
    return this.get('status') == PersonStatus.AUDITOR;
  }),

  isNascentRanger: computed('status', function() {
    const status = this.get('status');

    return (status == PersonStatus.ALPHA || status == PersonStatus.PROSPECTIVE);
  }),

  //
  // API methods
  //

  changePassword: memberAction({ path: 'password', type: 'patch'}),

  retrieveLanguages: memberAction({ path: 'languages', type: 'get'}),

  have_role(role) {
    let roles = this.get('roles');
    return (roles && roles.includes(role))
  }
});
