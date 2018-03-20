import Service from '@ember/service';
import { A } from '@ember/array';
import RSVP from 'rsvp';

export default Service.extend({
  dialogs: A(),

  info(title, message) {
    this.open('modal-info', title, message);
  },

  confirm(title, message, confirmCallback) {
    this.open('modal-confirm', title, message, confirmCallback)
  },

  open(component, title, message, confirmCallback) {
    this.get('dialogs').pushObject({
      component, title, message, confirmCallback
    });
  },

  closeAction() {
    this.get('dialogs').shiftObject();
  },

  confirmAction() {
    const dialog = this.get('dialogs').shiftObject();
    dialog.confirmCallback();
  }
});
