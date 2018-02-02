import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  totalCredits: computed('slots.[]', function() {
    let totalCredits = 0.0;
    const slots = this.get('slots');

    if (slots) {
      totalCredits = slots.reduce((sum, slot) => sum + slot.get('credits'), 0.0);
    }

    return totalCredits;
  }),

  totalDuration: computed('slots.[]', function() {
    let totalDuration = 0;

    const slots = this.get('slots');

    if (slots) {
      totalDuration = slots.reduce((sum, slot) => sum + slot.get('slot_duration'), 0);
    }

    return totalDuration;
  }),

  actions: {
    removeSlot(slot) {
      const slots = this.get('slots');
      const flash = this.get('flash');

      flash.clearMessages();

      slot.destroyRecord().then(() => {
        slots.removeObject(slot);
        flash.success('The slot has been deleted.');
      }).catch((err) => {
        flash.warning('The slot cannot be deleted as this time.', err);
      })
    },
  }
});
