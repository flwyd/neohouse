import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import { computed } from '@ember/object';

export default Controller.extend(ClubhouseControllerMixins, {
  queryParams: [ 'year' ],

  viewSchedule: 'upcoming',

  totalCredits: computed('slots', function() {
    let totalCredits = 0.0;
    const slots = this.get('slots');

    if (slots) {
      totalCredits = slots.reduce((sum, slot) => sum + slot.get('credits'), 0.0);
    }

    return totalCredits;
  }),

  totalDuration: computed('slots', function() {
    let totalDuration = 0;

    const slots = this.get('slots');

    if (slots) {
      totalDuration = slots.reduce((sum, slot) => sum + slot.get('slot_duration'), 0);
    }

    return totalDuration;
  }),

  viewSlots: computed('slots', 'viewSchedule', function() {
    const viewSchedule = this.get('viewSchedule');
    const slots = this.get('slots');

    if (viewSchedule != 'upcoming') {
      return slots;
    }

    return slots.filter((slot) => !slot.get('has_started'))

  }),

  upcomingCount: computed('slots', function() {
    const slots = this.get('slots');
    return slots.reduce(function(upcoming, slot) { return (slot.get('has_started') ? 0 : 1)+upcoming; }, 0);
  }),

  actions: {
    changeView(value) {
      this.set('viewSchedule', value);
    },

    changeYear(year) {
      this.set('year', year);
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
        slots.removeObject(slot);
      }).catch((response) => {
        self.handleErrorResponse(response);
      })
    },
  }
});
