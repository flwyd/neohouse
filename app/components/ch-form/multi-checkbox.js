// heavily based off
// http://jarrettmeyer.com/2016/03/28/an-ember-multiselect-checkbox

import Object from '@ember/object';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { typeOf } from '@ember/utils';

const MultiCheckboxField = Object.extend({
  label: '',
  value: '',
  isChecked: false,

  fieldId: null,

  clicked: observer('isChecked', function() {
    this.get('onClick').call(this);
  }),
});

export default Component.extend({
  name: null,
  value: '',

  options: [ ],
  labelProperty: 'label',
  valueProperty: 'value',

  checkboxes: computed("options", function() {
    const self = this;
    const options = this.get('options');
    const labelProperty = this.get('labelProperty');
    const valueProperty = this.get('valueProperty');
    let values = this.get('value');

    if (typeOf(values) != 'array') {
      values = [ values ];
    }

    return this.get("options").map(function(opt) {
      let label, value;
      const optType = typeOf(opt);

      if (optType == 'object') {
        label = opt[labelProperty];
        value = opt[valueProperty];
      } else if (optType == 'array') {
        label = opt[0];
        value = opt[1];
      } else {
        label = value = opt;
      }

      const field =  MultiCheckboxField.create({
        label,
        value,
        isChecked: values.includes(value),

        onClick() {  self.send('onClick'); }
      });

      field.set('fieldId', 'checkbox-' + Ember.guidFor(field));

      return field;
    });

  }),

  actions: {
    onClick() {
      let values = [];
      this.get('checkboxes').forEach(function (checkbox) {
        if (checkbox.get('isChecked')) {
          values.push(checkbox.get('value'))
        }
      })

      this.get('onUpdate')(values);
    },
  }
});
