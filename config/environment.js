/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'neohouse',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
    },

    'ember-simple-auth': {
      authorizer: 'authorizer:token',
      routeAfterAuthentication: '/'
    },

    'ember-simple-auth-token': {
      refreshAccessTokens      : true,
      identificationField      : 'identification',
      passwordField            : 'password',
      tokenPropertyName        : 'token',
      refreshTokenPropertyName : 'token',
    //  tokenExpireName          : 'expires_in',

      authorizationPrefix      : 'JWT ',
      authorizationHeaderName  : 'Authorization',
      headers                  : {}
    },
    flashMessageDefaults: {
      sticky: false,
      
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' *",
      'font-src': "'self' *",
      'connect-src': "'self' *",
      'img-src': "'self' *",
      'style-src': "'self' 'unsafe-inline' ",
      'media-src': "'self' *"
    }
    ENV['ember-simple-auth-token'].serverTokenEndpoint = 'http://localhost:8000/api/auth/login'
    ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = 'http://localhost:8000/api/auth/refresh'
    ENV['api-server'] = 'http://localhost:8000/api'
    ENV.APP.LOG_TRANSITIONS = true
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true
    ENV.APP.LOG_VIEW_LOOKUPS = true
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV['ember-simple-auth-token'].serverTokenEndpoint = 'http://rangeroffice.burningman.org/api/auth/session'
    ENV['api-server'] = 'http://rangeroffice.burningman.org/api'
  }

  return ENV;
};
