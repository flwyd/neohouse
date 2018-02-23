import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this.$('#dialog-box').modal();
    this.$('#dialog-box').modal().on('show.bs.modal', () => {
      return this.get('onShow')
        ? this.get('onShow')()
        : null;
    });
    this.$('#dialog-box').modal().on('hide.bs.modal', () => {
      return this.get('onClose')
        ? this.get('onClose')()
        : null;
    });

  },

  willDestroyElement() {
    this.$('#dialog-box').modal().off('hide.bs.modal');
    this.$('#dialog-box').modal('hide');
  }
});
