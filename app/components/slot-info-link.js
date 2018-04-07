import Component from '@ember/component';

export default Component.extend({

  actions: {
    show() {
      let text = this.get('slot.slot_url');
      if (!text) {
        return;
      }
      text = text.replace(/\b(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
      this.modal.info('Shift Additional Information', text);
    }
  }
});
