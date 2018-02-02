import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  tagName: '',
  years: null,
  year: 0,

  yearOptions: computed("years", function() {
    const currentYear = (new Date()).getFullYear();
    const years = this.get('years').slice();

    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }

    // descending sort
    years.sort((a, b) => (b - a));
    return years;
  }),
});
