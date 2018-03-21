import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import ResetPasswordValidations from '../validations/reset-password';

export default Controller.extend(ClubhouseControllerMixins, {
  ResetPasswordValidations,

  actions: {
    submit(model, isValid) {
      if (!isValid)
        return;

      let identification = model.get('identification');

      const self = this;

      return this.ajax.request('/auth/reset-password', {
        method: 'POST',
        data: { identification }
      }).then(() => {
        self.modal.info('Reset password instructions sent.', `Instructions to reset your password will be sent to you shortly. Please check your email '${identification}'.`);
        self.transitionToRoute('login');
      }).catch(function(response) { self.handleErrorResponse(response) });
    }
  }

});
