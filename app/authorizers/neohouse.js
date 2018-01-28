import Base from 'ember-simple-auth/authorizers/base';
import {inject as service} from '@ember/service';


export default Base.extend({
  session: service(),
  authorize(data, block) {
    const { token } = data
    if (this.get('session.isAuthenticated') && token) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
