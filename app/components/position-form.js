import Component from '@ember/component';
import { computed } from 'ember-decorators/object';
import ClubhouseMixins from 'neohouse/mixins/clubhouse-controller';
import PositionValidations from 'neohouse/validations/position';
import PositionTypes from 'neohouse/constants/position-types';

export default Component.extend(ClubhouseMixins, {
  PositionTypes,
  PositionValidations,

  @computed('trainingPositions')
  get trainingOptions() {
    const options = [
      ['-', '']
    ];

    const positions = this.get('trainingPositions');

    positions.forEach((position) => {
      options.pushObject([position.get('title'), position.get('id')]);
    })

    return options;
  },

  actions: {
      save(model, isValid) {
        this.get('onSave')(model, isValid);
      },

      cancel() {
        this.get('onCancel')();
      }
  }
});
