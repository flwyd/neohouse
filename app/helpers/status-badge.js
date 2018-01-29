import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import * as PersonStatus from '../constants/person_status';

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
