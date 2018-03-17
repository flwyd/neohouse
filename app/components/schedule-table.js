import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  viewSchedule: 'upcoming',

  @computed('slots')
  get totalCredits() {
    let totalCredits = 0.0;
    const slots = this.get('slots');

    if (slots) {
      totalCredits = slots.reduce((sum, slot) => sum + slot.get('credits'), 0.0);
    }

    return totalCredits;
  },

  @computed('slots')
  get totalDuration() {
    let totalDuration = 0;

    const slots = this.get('slots');

    if (slots) {
      totalDuration = slots.reduce((sum, slot) => sum + slot.get('slot_duration'), 0);
    }

    return totalDuration;
  },

  @computed('slots', 'viewSchedule')
  get viewSlots() {
    const viewSchedule = this.get('viewSchedule');
    const slots = this.get('slots');

    if (viewSchedule != 'upcoming') {
      return slots;
    }

    return slots.filter((slot) => !slot.get('has_started'))

  },

  @computed('slots')
  get upcomingCount() {
    const slots = this.get('slots');
    return slots.reduce(function(upcoming, slot) { return (slot.get('has_started') ? 0 : 1)+upcoming; }, 0);
  },

  actions: {
    changeView(value) {
      this.set('viewSchedule', value);
    },

    showPeople(slot) {
      const self = this;
      this.ajax.request('slot/'+slot.get('id')+'/people')
        .then((result) => {
          const callsigns = result.people.map(function (person) { return person.callsign; })
          self.modal.info(slot.get('slot_begins')+' '+slot.get('slot_description'), callsigns.join(', '));
        })
        .catch((response) => self.handleErrorResponse(response));
    },

    leaveSlot(slot) {
      if (!confirm('Are you sure?'))
        return;

      let slots = this.get('slots');
      const personId = this.get('person.id');
      const slotId = slot.get('id');
      const self = this;

      this.ajax.request(`person/${personId}/schedule/${slotId}`, {
        method: 'DELETE',
      }).then(() => {
        slot.set('person_assigned', false);
      }).catch((response) => {
        self.handleErrorResponse(response);
      })
    },
  }
});
