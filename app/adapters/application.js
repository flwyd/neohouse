import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'neohouse/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV['api-server'],
  authorizer: 'authorizer:neohouse',
});
