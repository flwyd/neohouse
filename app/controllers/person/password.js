import Controller from '@ember/controller';
import PasswordValidations from 'neohouse/validations/password';

export default Controller.extend({
  PasswordValidations,

  isLoading: false,

  actions: {
    submit(model, isValid, originalModel) {
      if (!isValid)
        return;

      const flash = this.get('flashMessages');
      const person = this.get('person');
      const self = this;

      flash.clearMessages();
      return person.changePassword({ password: model.get('password') }).then(function() {
        flash.success('The password was successfully changed.');
        self.transitionToRoute('person.overview', person.get('id'));
      }).catch(function (result) {
        if (result && result.errors) {
          result.errors.forEach((error) => {
            model.pushErrors(error.attribute,  error.message);
          });
        }
        flash.warning('The password could not be changed.');
      })
    },

    back(model) {
      this.transitionToRoute('person.overview', this.get('person.id'));
    }
  }

});
