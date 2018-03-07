import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  styleWidth: computed('slot', function() {
    const slot = this.get('slot');
    const signedUp = slot.get('slot_signed_up');
    const max = slot.get('slot_max');

    return `width: ${((signedUp*100)/max)}%`;
  }),

  indicatorColor: computed('slot', function() {
    const slot = this.get('slot');
    const signedUp = slot.get('slot_signed_up');
    const max = slot.get('slot_max');
    const percent = signedUp/max;

    if (percent > 0.85) {
      return 'warning';
    } else {
      return 'success';
    }
  }),
}).reopenClass({
  positionalParams: [ 'slot' ]
});
