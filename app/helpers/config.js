import { helper } from '@ember/component/helper';
import ENV from 'neohouse/config/environment';

export function config([ key ]) {
  const neoConfig = ENV['neoConfig'];
  return neoConfig ? neoConfig[key] : undefined;
}

export default helper(config);
