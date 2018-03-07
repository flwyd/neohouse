import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/string';

export default Mixin.create({
    isLoading: false,

    handleErrorResponse(response) {
      let message;
      let responseErrors = '';

      console.log("Error Response: ", response);


      if (response) {
        if (response.payload && response.payload.errors) {
          responseErrors = response.payload.errors;
        } else if (response.errors) {
          responseErrors = response.errors;
        }
      }
      if (responseErrors) {
        const errors = responseErrors.map(function(error) {
          return '<li>' + error.title + '</li>';
        })
        const plural = errors.length == 1? ' was' : 's were';
        message = `The following error${plural} encountered:<ul>${errors.join('')}<ul>`;
      } else {
        message = 'A server error was encountered: ' + response;
      }

      this.get('flash').add({
        type: 'danger',
        sticky: true,
        destroyOnClick: false,
        message: htmlSafe(message)
      });
    },

    saveModel(model, isValid, successMessage, routeAfterSave) {
      if (!isValid)
        return;

      const flash = this.get('flashMessages');
      const self = this;

      if (!model.get('isDirty')) {
        flash.success(successMessage);
        self.transitionToRoute(routeAfterSave);
        return;
      }


      flash.clearMessages();

      return model.save().then(function() {
        flash.success(successMessage);
        self.transitionToRoute(routeAfterSave);
      }).catch((response) => {
        self.handleErrorResponse(response);
      });

    }
});
