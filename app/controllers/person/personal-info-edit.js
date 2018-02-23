import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import PersonInfoValidations from 'neohouse/validations/person-info';
import { ShortSleeve as ShortSleeveOptions, LongSleeve as LongSleeveOptions } from 'neohouse/constants/shirts';

export default Controller.extend(ClubhouseControllerMixins, {
  PersonInfoValidations,
  ShortSleeveOptions,
  LongSleeveOptions,

  actions: {
    submit(model, isValid) {
      this.saveModel(model, isValid,
          'The personal information was successfully updated.',
          'person.personal-info-show');
    },
  }

});
