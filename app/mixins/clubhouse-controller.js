import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/string';

export default Mixin.create({
    isLoading: false,

    handleErrorResponse(response) {
      const flash = this.get('flash');

      console.log("Error Response: ", response);

      const errors = [];
      let message;

      if (response && response.errors) {
        response.errors.forEach(function(error) {
          errors.push('<li>' + error.title + '</li>');
        })
        const plural = errors.length == 1? ' was' : 's were';
        message = `The following error${plural} encountered:<ul>${errors.join('')}<ul>`;
      } else {
        message = 'A server error was encountered: ' + response;
      }

      flash.add({
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
