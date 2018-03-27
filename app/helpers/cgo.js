import { helper } from '@ember/component/helper';
import ENV from 'neohouse/config/environment';

// Method to bounce back over to clubhouse prime website

export function cgo([ controller, method, param ]/*, hash*/) {
  if (!ENV['dual-clubhouse']) {
    return '#';
  }

  let url = ENV['clubhouse-prime']+`/?DMSc=${controller}&DMSm=${method}`;

  if (param) {
    url += '&'+param;
  }

  return url;
}

export default helper(cgo);
