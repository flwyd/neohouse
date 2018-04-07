import DS from 'ember-data';
import Inflector from 'ember-inflector';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'neohouse/config/environment';

const inflector = Inflector.inflector;

inflector.uncountable('person');
inflector.uncountable('timesheet');
inflector.uncountable('access-document');
inflector.uncountable('position');

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV['api-server'],
  authorizer: 'authorizer:neohouse',
});
