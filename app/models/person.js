import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';
import { typeOf } from '@ember/utils';
import { computed } from 'ember-decorators/object';

import { PersonStatus } from 'neohouse/constants/person_status';
import { roleName } from 'neohouse/constants/roles';

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


  // Read only

  years_rangered:               DS.attr('', { readOnly: true}),
  unread_message_count:         DS.attr('number', { readOnly: true}),
  photo_url:                    DS.attr('string', { readOnly: true }),

  // Computed methods
  @computed('status', 'callsign_approved')
	get isPastProspectiveDisabled() {
      return (this.get('status') == PersonStatus.PAST_PROSPECTIVE && !this.get('callsign_approved'));
  },

  @computed('status')
	get isRanger() {
    const status = this.get('status');

    return (status == PersonStatus.ACTIVE
          || status == PersonStatus.VINTAGE
          || status == PersonStatus.AUDITOR);
  },

  @computed('status')
	get isAlpha() {
    return (status == PersonStatus.ALPHA)
  },

  @computed('status')
	get isAuditor() {
    return this.get('status') == PersonStatus.AUDITOR;
  },

  @computed('status')
	get isNascentRanger() {
    const status = this.get('status');

    return (status == PersonStatus.ALPHA || status == PersonStatus.PROSPECTIVE);
  },

  @computed('status')
  get isAuditorOrPastProspective() {
    return (status == PersonStatus.AUDITOR || status == PersonStatus.PAST_PROSPECTIVE);
  },

  hasRole(roles) {
    let personRoles = this.get('roles');

    if (!personRoles) {
      return false;
    }

    if (typeOf(roles) != 'array') {
      roles = [ roles ];
    }

    return roles.some(r => personRoles.includes(r));
  },

  hasAllRoles(roles) {
    let personRoles = this.get('roles');

    if (!personRoles) {
      return false;
    }

    if (typeOf(roles) != 'array') {
      roles = [ roles ];
    }

    const count = roles.filter((r) => personRoles(r));

    return (count == roles.length);
  },

  @computed('roles')
	get roleNames() {
    let personRoles = this.get('roles');

    if (!personRoles) {
      return 'none';
    }

    let names = [];

    personRoles.forEach((role) => {
      names.push(roleName(role))
    });

    return names.join(',');
  },

  //
  // AJAX methods
  //

  changePassword: memberAction({ path: 'password', type: 'patch'}),

});
