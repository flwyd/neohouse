import Response from 'ember-cli-mirage/response';
import JWT from 'npm:jsonwebtoken';

export default function() {
  // imported from ember-cli-simple-auth-token

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.urlPrefix = 'http://localhost:8000';

  this.get('/api/configs', function()  {
    return { };
  });

  this.post('/api/auth/login', function(schema, request) {
    var params = JSON.parse(request.requestBody);

    if (!params.identifier || !params.password) {
      const errors = [];

      if (!params.identifier) {
        errors.push({ status: 422, title: 'Email cannot be blank'});
      }

      if (!params.password) {
        errors.push({ status: 422, title: 'Password cannot be blank'});
      }

      return new Response(422, {'Content-Type': 'application/json'}, { errors });
    }

    const data = JWT.sign({}, 'secret', { expiresIn: 1000 },
      (token) => {
        return {
          token,
          token_type: 'bearer',
          expires_in: 1000,
          person_id:  1,
       };
     }
    );

    return data;

  });
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
