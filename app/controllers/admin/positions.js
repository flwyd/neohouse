import Controller from '@ember/controller';
import {computed} from 'ember-decorators/object';
import ClubhouseControllerMixin from 'neohouse/mixins/clubhouse-controller';
import PositionTypes from 'neohouse/constants/position-types';

export default Controller.extend(ClubhouseControllerMixin, {
  typeFilter: 'All',

  get typeOptions() {
    const types = PositionTypes.slice();

    types.unshift('All');
    return types;
  },

  @computed('positions.@each', 'typeFilter')
  get viewPositions() {
    const typeFilter = this.get('typeFilter');

    if (typeFilter == 'All') {
      return this.get('positions');
    }

    return this.get('positions').filterBy('type', typeFilter).sortBy('title');
  },

  @computed('positions.@each.type')
  get trainingPositions() {
    const positions = [ ];

    this.get('positions').forEach((position) => {
      if (position.get('type') == 'Training' && !position.get('title').match(/trainer/i)) {
        positions.pushObject(position);
      }
    })
    return positions;
  },

  actions: {
    new() {
      this.set('position', this.store.createRecord('position'));
    },

    edit(position) {
      this.set('position', position);
      window.scrollTo(0, 0);
    },

    save(model, isValid) {
      const isNew = model.get('isNew');
      const self = this;

      this.saveModel(model, isValid, `The position has been ${isNew ? 'created' : 'updated'}.`, function() {
        self.set('position', null);
        if (isNew) {
          self.get('positions').pushObject(model);
        }
      })
    },

    cancel(model) {
      const self = this;

      this.modal.confirm('Leave this form', 'Are you sure you wish to leave this form?', function() {
        self.set('position', null);
      })
    }
  }

});
