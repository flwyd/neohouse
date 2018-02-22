import Controller from '@ember/controller';
import PasswordValidations from 'neohouse/validations/password';

export default Controller.extend({
  PasswordValidations,

  isLoading: false,

  actions: {
    submit(model, isValid, originalModel) { // eslint-disable-line no-unused-vars
      if (!isValid) {
        return;
      }

      const flash = this.get('flash');
      const person = this.get('person');
      const self = this;
      let passwords = model.getProperties('password_old', 'password', 'password_confirmation');

      flash.clearMessages();
      return person.changePassword(passwords).then(function() {
        flash.success('The password was successfully changed.');
        self.transitionToRoute('person.overview');
      }).catch(function (result) {
        if (result && result.errors) {
          result.errors.forEach((error) => {
            flash.warning(error.title);
          });
        } else {
          flash.warning('The password could not be changed.');
        }
      })
    },

    back() {
      this.transitionToRoute('person.overview');
    }
  }

});
