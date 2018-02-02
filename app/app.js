import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { assert } from '@ember/debug';
import RSVP from 'rsvp';


RSVP.on('error', function(error) {
  // TODO: keep an eye on this
  // https://github.com/emberjs/ember.js/issues/12505
  if(error.name !== 'TransitionAborted') {
    assert(error, false);
  }
});

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);


export default App;
