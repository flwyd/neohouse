import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import LoginValidations from 'neohouse/validations/login';

export default Controller.extend(ClubhouseControllerMixins, {
  LoginValidations,

  actions: {
    submit(model, isValid) {
      if (!isValid)
        return;

      let credentials = model.getProperties('identification', 'password');

      return this.session.authenticate('authenticator:jwt', credentials)
            .catch(function(response) {
                this.handleErrorResponse(response)
            }.bind(this));
    }
  }

});
