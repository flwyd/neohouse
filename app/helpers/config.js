import { helper } from '@ember/component/helper';
import ENV from 'neohouse/config/environment';
import { config as neoConfig } from 'neohouse/utils/config';

export function config([ key ]) {
  return neoConfig(key);
}

export default helper(config);
