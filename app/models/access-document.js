import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

export default DS.Model.extend({
  person_id:       DS.attr('number'),
  type:            DS.attr('string'),
  status:          DS.attr('string'),
  source_year:     DS.attr('number'),
  access_date:     DS.attr('string'),
  access_any_time: DS.attr('boolean'),
  name:            DS.attr('string'),
  comments:        DS.attr('string'),
  expiry_date:     DS.attr('string'),
  create_date:     DS.attr('string'),
  modified_date:   DS.attr('string'),

  @computed('status')
	get isQualified() {
    return this.get('status') == 'qualified';
  },

  @computed('status')
	get isClaimed() {
    return this.get('status') == 'claimed';
  },

  @computed('status')
	get isBanked() {
    return this.get('status') == 'banked';
  },

  @computed('status')
	get isSubmitted() {
    return this.get('status') == 'submitted';
  },

  @computed('status')
	get isUsed() {
    return this.get('status') == 'used';
  },

  @computed('status')
	get isCancelled() {
    return this.get('status') == 'cancelled';
  },

  @computed('status')
	get isExpired() {
    return this.get('status') == 'expired';
  }
});
