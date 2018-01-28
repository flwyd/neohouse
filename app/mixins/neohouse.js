import Mixin from '@ember/object/mixin';
import ENV from 'neohouse/config/environment';

export default Mixin.create({
  config(key) {
    return ENV['neoConfig'][key];
  }
});
