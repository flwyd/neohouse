import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import PasswordValidations from 'neohouse/validations/password';

export default Controller.extend(ClubhouseControllerMixins, {
  PasswordValidations,

  actions: {
    submit(model, isValid) { // eslint-disable-line no-unused-vars
      if (!isValid) {
        return;
      }

      const person = this.get('person');

      let passwords = model.getProperties('password_old', 'password', 'password_confirmation');

      return person.changePassword(passwords).then(function() {
        self.notify.success('Password change successful.');
        self.transitionToRoute('person.overview');
      }).catch((response) => { self.handleErrorResponse(response) })
    },

    back() {
      this.transitionToRoute('person.overview');
    }
  }
});
