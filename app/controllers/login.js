import Controller from '@ember/controller';

import LoginValidations from '../validations/login';

export default Controller.extend({
  LoginValidations,

  actions: {
    submit(model, isValid) {
      if (!isValid)
        return;

      let credentials = {
        identification: model.get('identification'),
        password: model.get('password')
      };

      const flash = this.get('flash');

      flash.clearMessages();

      return this.get('session').authenticate('authenticator:jwt', credentials).catch(reason => {
        if (reason && reason.errors) {
          reason.errors.forEach((error) => {
            flash.danger(error.detail || error.title);
          })
        } else {
          flash.danger('An unexpected error occurred.')
        }
      })
    }
  }

});
