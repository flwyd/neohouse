import Controller from '@ember/controller';
import ClubhouseControllerMixins from 'neohouse/mixins/clubhouse-controller';
import LoginValidations from 'neohouse/validations/login';
import ENV from 'neohouse/config/environment';

export default Controller.extend(ClubhouseControllerMixins, {
  LoginValidations,

  neohouseLogin(credentials) {
    return this.session.authenticate('authenticator:jwt', credentials)
          .catch(function(response) {
              this.handleErrorResponse(response)
          }.bind(this));
  },

  setCookie(name, value, days) {
    let expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  },

  actions: {
    submit(model, isValid) {
      if (!isValid)
        return;

      const self = this;

      this.notify.clearMessages();
      let credentials = model.getProperties('identification', 'password');

      // Simple try for neoclubhouse authorization if not running
      // a dual clubhouse
      if (!ENV['dual-clubhouse']) {
        return this.neohouseLogin(credentials);
      }

      //
      // Attempt to authorizae with clubhouse prime before trying for
      // neoclubhouse
      //

      return this.ajax.post(ENV['clubhouse-prime']+'/?DMSc=security&DMSm=login&json=1',
        {
          type: 'POST',
          data: { DMSe: credentials.identification, DMSp: credentials.password },
        }
      ).then(function(response) {
        // So far, so good. set the clubhouse prime PHP session cookie,
        // and then try for neoclubhouse authentication.
        const session = response.session;
        self.setCookie(session.name, session.id);
        return self.neohouseLogin(credentials);
      })
      .catch((response) => self.handleErrorResponse(response));
    },
  }

});
