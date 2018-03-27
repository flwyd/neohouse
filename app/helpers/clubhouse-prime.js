import { helper } from '@ember/component/helper';
import ENV from 'neohouse/config/environment';

export function clubhousePrime([ path ]/*, hash*/) {
  return ENV['clubhouse-prime']+path;
}

export default helper(clubhousePrime);
