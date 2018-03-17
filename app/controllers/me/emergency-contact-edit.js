import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import EmergencyContactValidations from 'neohouse/validations/emergency-contact';

export default Controller.extend(ClubhouseControllerMixins, {
  EmergencyContactValidations,

  actions: {
    submit(model, isValid) {
      this.saveModel(model, isValid,
        'Emergency contact info updated.',
        'me.emergency-contact-show');
    },
  }

});
