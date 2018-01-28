import { helper } from '@ember/component/helper';

export function creditsFormat([ credits ]) {
  return (+credits).toFixed(2)
}

export default helper(creditsFormat);
