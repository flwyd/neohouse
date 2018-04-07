import { helper } from '@ember/component/helper';

export function pluck([ id, records, column, defaultValue ]) {
  const record = records.findBy('id', id);

  if (!record) {
    return defaultValue;
  }

  return record.get(column);
}

export default helper(pluck);
