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

      this.modal.info("There's a problem...", message);
    },

    saveModel(model, isValid, successMessage, routeAfterSave) {
      if (!isValid)
        return;

      const self = this;

      if (!model.get('isDirty')) {
        self.notify.success(successMessage);
        self.transitionToRoute(routeAfterSave);
        return;
      }

      return model.save().then(function() {
        self.notify.success(successMessage);
        self.transitionToRoute(routeAfterSave);
      }).catch((response) => {
        self.handleErrorResponse(response);
      });

    }
});
