import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';
import { Role } from 'neohouse/constants/roles';

export default Controller.extend({
  queryParams: [ 'year' ],

  @computed('timesheets')
  get positions() {
    let positionGroups = {};
    const timesheets = this.get('timesheets');

    timesheets.forEach((sheet) => {
      const title = sheet.get('position_title');
      let group = positionGroups[title];
      if (!group) {
        group = positionGroups[title] = [];
      }

      group.push(sheet);
    })

    const positionTitles = Object.keys(positionGroups).sort();
    const positions = [];

    positionTitles.forEach(function(title) {
        const group = positionGroups[title];
        const credits = group.reduce((credits, position) => { return position.get('credits') + credits }, 0.0);
        const duration = group.reduce((duration, position) => { return position.get('duration') + duration }, 0);

        positions.push({ title, credits, duration, total: group.length });
    });

    return positions;
  },

  @computed('session.user.roles')
  get showActions() {
    const user = this.get('session.user');

    return (user.hasRole([ Role.ADMIN, Role.MANAGE ]));
  },

  actions: {
    changeYear(year) {
      this.set('year', year);
    }
  }
});
