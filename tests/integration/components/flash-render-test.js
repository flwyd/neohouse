import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import FlashMessage from 'ember-cli-flash/flash/object';

const flashStubService = Service.extend({
    queue: null,
});

moduleForComponent('flash-render', 'Integration | Component | flash render', {
  integration: true,

  beforeEach() {
    this.register('service:flashstub', flashStubService);
    // Calling inject puts the service instance in the context of the test,
    // making it accessible as "locationService" within each test
    this.inject.service('flashstub', { as: 'flash' });
  }
});


test('it renders a flash message', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('flash.queue', [ FlashMessage.create({ message: 'The alien invasion is complete.'}) ]);

  this.render(hbs`{{flash-render flash=flash}}`);

  assert.ok(this.$("div.flash-message").text().indexOf('The alien invasion is complete') !== -1);
});
