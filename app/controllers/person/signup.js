import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import {computed} from '@ember/object';
import {A} from '@ember/array';
import moment from 'npm:moment';

export default Controller.extend(ClubhouseControllerMixins, {
  setup(model) {
    this.set('slots', model.slots);
  },

  slotGroups: computed('slots.[]', 'filterDay', 'filterPosition', 'filterDescription', function() {
    let slots = this.get('slots');
    const filterDay = this.get('filterDay');
    const filterPosition = this.get('filterPosition');
    const filterDescription = this.get('filterDescription');

    if (filterPosition && filterPosition.id) {
      if (filterPosition.id != 'all') {
        slots = slots.filterBy('position_id', filterPosition.id);
      }
    }

    if (filterDay && filterDay.id) {
      const day = filterDay.id;

      if (day == 'upcoming') {
        slots = slots.filterBy('has_started', false);
      } else if (day != 'all') {
        slots = slots.filterBy('slotDay', day);
      }
    }

    if (filterDescription && filterDescription != 'All') {
      slots = slots.filterBy('slot_description', filterDescription);
    }

    let groups = A();
    slots.forEach(function(slot) {
      const title = slot.get('position_title');
      let group = groups.findBy('title', title)

      if (group) {
        group.slots.push(slot);
      } else {
        groups.pushObject({title, position_id: slot.position_id, slots: [slot]});
      }
    });

    return groups.sortBy('title');
  }),

  positionOptions: computed('slots', function() {
    const unique = this.get('slots').uniqBy('position_title');

    let options = A();

    unique.forEach(function(position) {
      options.pushObject({id: position.get('position_id'), title: position.get('position_title')});
    });

    options = options.sortBy('title');
    options.unshiftObject({id: 'all', title: 'All Positions'});
    return options;
  }),

  filterPosition: computed('positionOptions', function() {
    return this.get('positionOptions.firstObject');
  }),

  dayOptions: computed('slots', 'filterPosition', function() {
    const unique = this.get('slots').uniqBy('slotDay').mapBy('slotDay');
    const days = A();

    days.pushObject({id: 'all', title: 'All Days'});
    days.pushObject({id: 'upcoming', title: 'Upcoming Shifts'});

    unique.forEach(function(day) {
      days.pushObject({id: day, title: moment(day).format('ddd MMM DD')})
    });

    return days;
  }),

  filterDay: computed('dayOptions', function() {
    return this.get('dayOptions.firstObject');
  }),

  descriptionOptions: computed('slots', function() {
    let slots = this.get('slots').uniqBy('slot_description');
    const timeOfDay = [ 'Morning', 'Afternoon', 'Swing', 'Grave', 'Day' ];

    const groupOptions = [
      'All',
      { groupName: 'Time Of Day', options: timeOfDay }
    ];

    const groupOther = {
      groupName: 'Other',
      options: [ ]
    };

    slots = slots.filter((slot) => { return !timeOfDay.includes(slot.get('slot_description')) })
    slots = slots.sortBy('position_type', 'slot_description');

    slots.forEach(function(slot) {
      const type = slot.get('position_type');
      const title = slot.get('slot_description');

      if (!type || type == 'Other') {
        groupOther.options.push(title);
        return;
      }

      let group = groupOptions.find((opt) => { return type == opt.groupName });

      if (group) {
        group.options.push(title);
      } else {
        groupOptions.push({
          groupName: type,
          options: [ title ]
        })
      }
    });

    if (groupOther.options.length > 0) {
      groupOptions.push(groupOther);
    }

    return groupOptions;
  }),

  filterDescription: computed('descriptionOptions', function() {
    return this.get('descriptionOptions').objectAt(0);
  }),

  actions: {
    joinSlot(slot) {
      const flash = this.get('flash');
      const modal = this.get('modal');
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
      }).then((response) => {
          slot.set('person_assigned', true);
          slot.set('slot_signed_up', response.signed_up);
          if (response.forced) {
            flash.warning('The slot has been added the schedule. However, the is slot overcapacity.')
          } else {
            flash.success('Successfully signed up.');
          }
      }).catch((response) => {
        if (!response.payload) {
          this.handleErrorResponse(response);
          return;
        }

        switch (response.payload.status) {
          case 'full':
            modal.info('The shift is full.', 'The slot is at capacity with '+slot.get('slot_signed_up')+' indivduals signed up.');
            break;

          case 'no-slot':
            modal.info('The slot could not be found?', 'The slot '+slot.get('id')+' was not found in the database. This looks like a bug!');
            break;

          case 'no-position':
            modal.info('Position not held', 'You do not hold the position ['+slot.get('position_title')+'] in order to sign up for this shift.');
            break;

          case 'exists':
            modal.info('Already signed up','Huh, looks like you already signed up for the shift.');
            break;

          default:
            this.handleErrorResponse(response);
            break;
        }
      });
    },

    leaveSlot(slot) {
      if (!confirm('Are you sure?'))
        return;

      const slots = this.get('slots');
      const flash = this.get('flash');
      const personId = this.get('person.id');

      flash.clearMessages();

      slot.destroyRecord({
        adapterOptions: {
          person_id: personId
        }
      }).then(() => {
        slots.set('person_assigned', false);
        flash.success('The shift sign up has been removed.');
      }).catch((err) => {
        this.handleErrorResponse(err);
      })
    },

    showPeople(slot) {
      const self = this;
      this.ajax.request('slot/' + slot.get('id') + '/people').then((result) => {
        const callsigns = result.people.map(function(person) {
          return person.callsign;
        })
        self.modal.info(slot.get('slot_description'), callsigns.join(', '));
      }).catch((response) => self.handleErrorResponse(response));
    },

    resetFilters() {
      this.clearFilters();
    }
  }
});
