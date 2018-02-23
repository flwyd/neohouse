import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
  dialogs: A(),

  info(title, message, model=null) {
    this.open('modal-info', title, message, model);
  },

  open(component, title, message, model) {
    this.get('dialogs').pushObject({
      component, title, message, model
    });
  },

  close() {
    this.get('dialogs').shiftObject();
  }
});
