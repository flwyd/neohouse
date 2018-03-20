import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import {A} from '@ember/array';
import moment from 'npm:moment';
import { computed } from 'ember-decorators/object';

const allDays = { id: 'all', title: 'All Days'};
const allPositions = {id: 'all', title: 'All Positions'};

export default Controller.extend(ClubhouseControllerMixins, {
  queryParams: [ 'year' ],

  setup(model) {
    this.set('slots', model);
    this.set('filterDay', allDays);
    this.set('filterPosition', allPositions);
    this.set('filterDescription', 'All');
  },

  @computed('slots', 'filterDay', 'filterPosition', 'filterDescription')
	get slotGroups() {
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
  },

  @computed('slots.[]')
	get positionOptions() {
    const unique = this.get('slots').uniqBy('position_title');

    let options = A();

    unique.forEach(function(position) {
      options.pushObject({id: position.get('position_id'), title: position.get('position_title')});
    });

    options = options.sortBy('title');
    options.unshiftObject(allPositions);
    return options;
  },

  @computed('slots.[]', 'filterPosition')
	get dayOptions() {
    const unique = this.get('slots').uniqBy('slotDay').mapBy('slotDay');
    const days = A();

    days.pushObject(allDays);
    days.pushObject({id: 'upcoming', title: 'Upcoming Shifts'});

    unique.forEach(function(day) {
      days.pushObject({id: day, title: moment(day).format('ddd MMM DD')})
    });

    return days;
  },

  @computed('slots.[]')
	get descriptionOptions() {
    let slots = this.get('slots').uniqBy('slot_description');
    const timeOfDay = [ 'Morning', 'Afternoon', 'Swing', 'Grave', 'Graveyard', 'Day' ];

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
      let type = slot.get('position_type');
      const title = slot.get('slot_description');

      if (!type || type == 'Other') {
        groupOther.options.push(title);
        return;
      }

      if (type == 'Training') {
        type = 'Training Locations';
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
  },

  @computed('slots.@each.person_assigned')
	get signedUpSlots() {
    const slots =  this.get('slots').filterBy('person_assigned', true);
    let prevEndTime = 0, prevSlot = null;

    slots.forEach(function(slot) {
      if (slot.get('slot_begins_time') < prevEndTime) {
        slot.set('is_overlapping', true);
        prevSlot.set('is_overlapping', true);
      } else {
        slot.set('is_overlapping', false);
      }
      prevEndTime = slot.get('slot_ends_time');
      prevSlot = slot;
    });

    return slots;
  },

  actions: {
    changeYear(year) {
      this.set('year', year);
    },

    joinSlot(slot) {
      const notify = this.get('notify');
      const modal = this.get('modal');
      const personId = this.get('person.id');
      const slotId = slot.get('id');

      this.ajax.request(`person/${personId}/schedule`, {
        method: 'POST',
        data: { slot_id: slotId }
      }).then((response) => {
          slot.set('person_assigned', true);
          slot.set('slot_signed_up', response.signed_up);
          if (response.forced) {
            modal.info('Shift is full', 'The shift has been added to the schedule. However, the shift is overcapacity.')
          } else {
            notify.success('Successfully signed up.');
          }
      }).catch((response) => {
        if (!response.payload) {
          this.handleErrorResponse(response);
          return;
        }

        switch (response.payload.status) {
          case 'full':
            modal.info('The shift is full.', 'The shift is at capacity with '+slot.get('slot_signed_up')+' indivduals signed up.');
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
      const self = this;

      self.modal.confirm('Confirm Leaving Shift',
        `Are you sure you want to leave the shift "${slot.get('slot_description')}"?`,
        function() {
          const notify = self.get('notify');
          const personId = self.get('person.id');
          const slotId = slot.get('id');

          self.ajax.request(`person/${personId}/schedule/${slotId}`, {
            method: 'DELETE',
          }).then((result) => {
            slot.set('person_assigned', false);
            slot.set('slot_signed_up', result.signed_up);
            notify.success('The shift sign up has been removed.');
          }).catch((err) => {
            self.handleErrorResponse(err);
          })

        }
      );
    },

    showPeople(slot) {
      const self = this;
      this.ajax.request('slot/' + slot.get('id') + '/people').then((result) => {
        const callsigns = result.people.map(function(person) {
          return person.callsign;
        })
        self.modal.info('Scheduled (Callsigns) for '+slot.get('slot_description'), callsigns.join(', '));
      }).catch((response) => self.handleErrorResponse(response));
    },
  }
});
