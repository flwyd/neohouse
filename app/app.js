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
    if (error.stack) {
      alert("RSVP Exception "+error.stack);
    }
    assert(error, false);
  }
});

Ember.onerror = function(error) {
  console.error(error);
  // TODO - log exception to server

  if (error.stack) {
    alert("Exception "+error.stack);
  } else {
    alert("Exception unknown "+error);
  }

}

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  LOG_TRANSITIONS_INTERNAL: true
});

loadInitializers(App, config.modulePrefix);


export default App;
