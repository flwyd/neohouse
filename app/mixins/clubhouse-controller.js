import Mixin from '@ember/object/mixin';

export default Mixin.create({
  isLoading: false,

  handleErrorResponse(response) {
    let message;
    let responseErrors = '';

    console.error("Error Response: ", JSON.stringify(response));

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
      const plural = errors.length == 1
        ? ' was'
        : 's were';
      message = `The following error${plural} encountered:<ul>${errors.join('')}</ul>`;
    } else {
      message = 'A server error was encountered: ' + response;
    }

    this.notify.danger(message, {sticky: true})
  },

  saveModel(model, isValid, successMessage, routeOrCallback) {
    if (!isValid)
      return;

    const self = this;
    const isCallback = typeof(routeOrCallback) == 'function';

    if (!model.get('isDirty')) {
      self.notify.success(successMessage);
      if (isCallback) {
        routeOrCallback(model);
      } else {
        self.transitionToRoute(routeOrCallback);
      }
      return;
    }

    return model.save().then(function() {
      self.notify.success(successMessage);
      if (isCallback) {
        routeOrCallback(model);
      } else {
        self.transitionToRoute(routeOrCallback);
      }
    }).catch((response) => {
      self.handleErrorResponse(response);
    });

  }
});
