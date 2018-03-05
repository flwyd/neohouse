import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend(ClubhouseControllerMixins, {
  filterDay: '',
  filterPosition: '',
  filterType: '',

  setup(model) {
    this.set('slots', model.slots);
    this.clearFilters();
  },

  clearFilters() {
    this.set('filterDay', '');
    this.set('filterPosition', '');
    this.set('filter')
  },

  slotGroups: computed('slots.[]', 'filterDay', 'filterPosition', 'filterType', function() {
    const slots = this.get('slots');
    const filterDay = this.get('filterDay');
    const filterPosition = this.get('filterPosition');
    const filterHasEnded = this.get('filterHasEnded');

    if (filterPosition){
      slots = slots.filterBy('position_id', filterPosition);
    }

    let groups = A();
    slots.forEach(function(slot) {
      const title = slot.get('position_title');
      let group = groups.findBy('title', title)

      if (group) {
        group.slots.push(slot);
      } else {
        groups.pushObject({
          title,
          position_id: slot.position_id,
          slots: [ slot ],
        });
      }
    });

    return groups;
  }),

  positions: computed('slots.[]', function() {
      const slots = this.get('slots');
      const unique = slots.uniqBy('position_title');

      return unique.map(function(position) {
        return { id: position.get('position_id'), title: position.get('position_title') };
      });
  }),

  actions: {
    joinSlot(slot) {
      const flash = this.get('flash');
      const personId = this.get('person.id');
      const slotId = slot.get('id');

      if (slot.get('slot_signed_up') >= slot.get('slot_max')) {
        if (!confirm('This shift is already at capacity. Continue to signup?')) {
          return;
        }
      }

      this.ajax.request(`person/${personId}/schedule`, {
        method: 'POST',
        data: { slot_id: slotId }
      }).then((result) => {
        switch (result.status) {
        case 'success':
          slot.set('person_assigned', true);
          slot.set('slot_signed_up', result.signed_up);
          if (result.forced) {
            flash.warning('The slot has been added the schedule. However, the is slot overcapacity.')
          } else {
            flash.success('Successfully signed up.');
          }
          break;
        case 'full':
          flash.danger('The shift is full.');
          break;

        case 'no-slot':
          flash.danger('The slot could not be found? ['+slot.id+']');
          break;

        case 'no-position':
          flash.danger('You do not hold the position needed for the shift.');
          break;

        case 'exists':
          flash.warning('Huh, looks like you already signed up for the shift.');
          break;

        default:
          flash.danger('The server gave an unexpected result '+result.status);
          break;
        }
      }).catch((result) => {
        this.handleErrorResponse(result);
      });
    },

    leaveSlot(slot) {
      if (!confirm('Are you sure?'))
        return;

      const slots = this.get('slots');
      const flash = this.get('flash');
      const personId = this.get('person.id');

      flash.clearMessages();

      slot.destroyRecord({ adapterOptions: { person_id: personId }}).then(() => {
        slots.removeObject(slot);
        flash.success('The slot has been deleted.');
      }).catch((err) => {
        this.handleErrorResponse(err);
      })
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

    resetFilters() {
      this.clearFilters();
    }
  }
});
