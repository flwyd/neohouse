import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { StringToRole } from 'neohouse/constants/roles';
import { observer } from '@ember/object';

export default Helper.extend({
  session: service(),

  compute(params) {
    const user = this.get('session.user');
    let roles = [];

    if (!user) {
      return false;
    }

    params.forEach(function(name) {
      const roleValue = StringToRole[name];

      if (roleValue) {
        roles.push(roleValue);
      } else {
        throw `Unknown role name [${name}]`
      }
    });
    return user.hasRole(roles);
  },

  rolesChanged: observer('session.user.roles', function() {
    this.recompute();
  })
});
