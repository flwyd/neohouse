import Component from '@ember/component';
import $ from 'jquery';

const sidebarCollapse = function() {
  $('.menu-collapsed').toggleClass('d-none');
  $('.sidebar-submenu').toggleClass('d-none');
  $('.submenu-icon').toggleClass('d-none');
  $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

  // Treating d-flex/d-none on separators with title
  var separatorTitle = $('.sidebar-separator-title');
  if ( separatorTitle.hasClass('d-flex') ) {
      separatorTitle.removeClass('d-flex');
  } else {
      separatorTitle.addClass('d-flex');
  }

  // Collapse/Expand icon
  $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
};

export default Component.extend({
  didRender() {
    // Hide submenus
    $('#body-row .collapse').collapse('hide');

    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left');

    // Collapse click
    $('[data-toggle=sidebar-colapse]').click(sidebarCollapse);
  },

  willDestroyElement() {
    $('[data-toggle=sidebar-colapse]').unbind('click', sidebarCollapse);
  }

});
