import DS from 'ember-data';

export default DS.Model.extend({
  title:                DS.attr('string'),
  new_user_eligible:    DS.attr('boolean'),
  all_rangers:          DS.attr('boolean'),
  count_hours:          DS.attr('boolean'),
  min:                  DS.attr('number'),
  max:                  DS.attr('number'),
  auto_signout:         DS.attr('boolean'),
  on_sl_report:         DS.attr('boolean'),
  short_title:          DS.attr('string'),
  type:                 DS.attr('string'),
  training_position_id:    DS.attr('number')
});
