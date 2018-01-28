import Component from '@ember/component';
import $ from 'jquery';

const tabShow = function (e) {
  e.preventDefault()
  $(this).tab('show')
};

export default Component.extend({
  tabid: null,

  didRender() {
    $('#'+this.get('tabid')+' a').click(tabShow);
  },

  willDestroyElement() {
    $('#'+this.get('tabid')+' a').unbind('click', tabShow);
  }
});
