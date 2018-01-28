export function initialize(app) {
  // sessions
  app.inject('controller', 'session', 'service:session');
  app.inject('component', 'session', 'service:session');
  app.inject('route', 'session', 'service:session');
  app.inject('ability', 'session', 'service:session');

  app.inject('controller', 'ajax', 'service:ajax');
  app.inject('component', 'ajax', 'service:ajax');
  app.inject('route', 'ajax', 'service:ajax');
  app.inject('ability', 'ajax', 'service:ajax');

  app.inject('controller', 'flashMessages', 'service:flashMessages');
  app.inject('component', 'flashMessages', 'service:flashMessages');
  app.inject('route', 'flashMessages', 'service:flashMessages');
  app.inject('ability', 'flashMessages', 'service:flashMessages');

}

export default {
  name: 'service-injects',
  initialize
};
