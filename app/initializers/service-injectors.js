const servicesToInject = {
  ajax:    'ajax',
  modal:   'modal',
  session: 'session',
  notify:  'notification-messages'
};

export function initialize(app) {
  // sessions
  for (var alias in servicesToInject) {
    const name = 'service:'+servicesToInject[alias];

    app.inject('controller', alias, name);
    app.inject('component', alias, name);
    app.inject('route', alias, name);
    app.inject('ability', alias, name);
  }
}

export default {
  name: 'service-injects',
  initialize
};
