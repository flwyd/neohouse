import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import Ember from 'ember';

export function chFormOptionsBuilder([options, currentValue]) {
  let optionsHtml = '';

  options.forEach((opt) => {
    let label,value;
    if (typeOf(opt) == 'array') {
      label = opt[0];
      value = opt[1];
    } else {
      label = value = opt;
    }

    const isSelected = (currentValue == value) ? 'selected' : '';
    optionsHtml += `<option value="${value}" ${isSelected}>${Ember.Handlebars.Utils.escapeExpression(label)}</option>`
  })

  return htmlSafe(optionsHtml);
}

export default helper(chFormOptionsBuilder);
