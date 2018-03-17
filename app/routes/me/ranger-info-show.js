import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import PersonMixins from 'neohouse/mixins/person';

export default Route.extend(PersonMixins, {
  queryParams: {
    year: { refreshModel: true }
  },

  model(params) {
    const person_id = this.get('session.user.id');
    const year = (params.year || (new Date).getFullYear());

    return this.get('ajax').request('person/'+person_id+'/yearinfo', { data: { year } })
       .then((result) => { return EmberObject.create(result.year_info); })
       .catch((err) => {
         alert("Could not retrieve ranger year info "+err);
       });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('year_info', model);
  }
});
