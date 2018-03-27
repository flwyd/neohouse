import Component from '@ember/component';
import { computed } from 'ember-decorators/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  @computed('slot')
  get styleWidth() {
    const slot = this.get('slot');
    const signedUp = slot.get('slot_signed_up');
    const max = slot.get('slot_max');

    return htmlSafe(`width: ${Math.floor((signedUp*100)/max)}%`);
  },

  @computed('slot')
  get indicatorColor() {
    const slot = this.get('slot');
    const signedUp = slot.get('slot_signed_up');
    const max = slot.get('slot_max');
    const percent = signedUp/max;

    return htmlSafe(percent > 0.85 ? 'warning' : 'success');
  },
}).reopenClass({
  positionalParams: [ 'slot' ]
});
