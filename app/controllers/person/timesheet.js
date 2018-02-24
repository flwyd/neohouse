import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  positions: computed('timesheets', function() {
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
  }),
});
