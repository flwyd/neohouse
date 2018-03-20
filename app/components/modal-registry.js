import Component from '@ember/component';

export default Component.extend({
  classNames: ['modal-registry'],

  actions: {
    close() {
      this.modal.closeAction();
    },

    confirm() {
      this.modal.confirmAction()
    },
  }
});
