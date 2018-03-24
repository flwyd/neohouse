import Component from '@ember/component';
import {computed} from 'ember-decorators/object';

export default Component.extend({
  tagName: '',
  years: null,
  year: 0,

  @computed("years")
  yearOptions() {
    const currentYear = (new Date()).getFullYear();
    const years = (this.get('years') || []).slice();

    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }

    // descending sort
    years.sort((a, b) => (b - a));
    return years;
  },
}).reopenClass({
  positionalParams: [ 'title', 'years', 'year']
});
