import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import { computed } from '@ember/object';

export default Controller.extend(ClubhouseControllerMixins, {
  viewSchedule: 'upcoming',

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

  viewSlots: computed('slots.[]', 'viewSchedule', function() {
    const viewSchedule = this.get('viewSchedule');
    const slots = this.get('slots');

    if (viewSchedule != 'upcoming') {
      return slots;
    }

    return slots.filter((slot) => slot.get('has_ended'))

  }),

  actions: {
    changeView(value) {
      this.set('viewSchedule', value);
    },

    showPeople(slot) {
      const self = this;
      this.ajax.request('slot/'+slot.get('slot_id')+'/people')
        .then((result) => {
          const callsigns = result.people.map(function (person) { return person.callsign; })
          self.modal.info(slot.get('slot_begins')+' '+slot.get('slot_description'), callsigns.join(', '));
        })
        .catch((response) => self.handleErrorResponse(response));
    },

    removeSlot(slot) {
      if (!confirm('Are you sure?'))
        return;

      const slots = this.get('slots');
      const flash = this.get('flash');

      flash.clearMessages();

      slot.destroyRecord().then(() => {
        slots.removeObject(slot);
        flash.success('The slot has been deleted.');
      }).catch((err) => {
        alert("The slot cannot be deleted at this time. "+err);
      })
    },
  }
});
