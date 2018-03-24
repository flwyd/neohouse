import { helper } from '@ember/component/helper';
import { config as neoConfig } from 'neohouse/utils/config';

export function config([ key ]) {
  return neoConfig(key);
}

export default helper(config);
