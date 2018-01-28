import Controller from '@ember/controller';
import EmergencyContactValidations from 'neohouse/validations/emergency-contact';

export default Controller.extend({
  EmergencyContactValidations,

  isLoading: false,

  actions: {
    submit(model, isValid, originalModel) {
      if (!isValid)
        return;

      const flash = this.get('flashMessages');
      const user = this.get('session.user');
      const self = this;

      flash.clearMessages();

      return model.save().then(function() {
        flash.success('The emergency contact information was successfully updated.');

        self.transitionToRoute('person.emergency-contact-show', originalModel.get('id'));
        if (user.get('id') == originalModel.get('id')) {
          return user.reload();
        }
      }).catch(function (err) {
        console.log("SUBMIT error ", err);
        originalModel.get('errors').forEach((error) => {
          model.pushErrors(error.attribute,  error.message);
        });
        flash.warning('The information could not be updated.');
      })
    },

    back(model) {
      this.transitionToRoute('person.emergency-contact-show', model.get('id'));
    }
  }

});
