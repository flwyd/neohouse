import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import * as PersonStatus from '../constants/person_status';

export const PROSPECTIVE = 'prospective';
export const PAST_PROSPECTIVE = 'past prospective';
export const ALPHA = 'alpha';
export const BONKED = 'bonked';
export const ACTIVE = 'active';
export const INACTIVE = 'inactive';
export const INACTIVE_EXTENSION = 'inactive extension';
export const RETIRED = 'retired';
export const UBERBONKED = 'uberbonked';
export const DISMISSED = 'dismissed';
export const VINTAGE = 'vintage';
export const DECEASED = 'deceased';
export const AUDITOR = 'auditor';
export const RESIGNED = 'resigned';

export function statusBadge([ status ]) {
  let color;

  switch (status) {
  case PersonStatus.PROSPECTIVE:
  case PersonStatus.ALPHA:
    color = 'info';
    break;


  case PersonStatus.BONKED:
  case PersonStatus.UBERBONKED:
  case PersonStatus.DISMISSED:
    color = 'danger';
    break;

  case PersonStatus.ACTIVE:
  case PersonStatus.AUDITOR:
  case PersonStatus.VINTAGE:
    color = 'success';
    break;

  default:
    color = 'secondary';
    break;
  }
  return htmlSafe(`<span class="badge badge-${color}">${status}</span>`);
}

export default helper(statusBadge);
