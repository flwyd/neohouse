import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/string';

export default Mixin.create({
    handleErrorResponse(response) {
      const flash = this.get('flash');

      console.log("Error Response: ", response);

      const errors = [];
      let message;

      if (response && response.errors) {
        response.errors.forEach(function(error) {
          errors.push('<li>' + error.title + '</li>');
        })
        message = `The following error${errors.length == 1
          ? ' was'
          : 's were'} encountered:<ul>${errors.join('')}<ul>`;
      } else {
        message = 'An unexpected server error was encountered: ' + response;
      }

      flash.danger(htmlSafe(message));
    }
});
