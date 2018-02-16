import Controller from '@ember/controller';
import PersonInfoValidations from 'neohouse/validations/person-info';
import { ShortSleeve as ShortSleeveOptions, LongSleeve as LongSleeveOptions } from 'neohouse/constants/shirts';

export default Controller.extend({
  PersonInfoValidations,
  ShortSleeveOptions,
  LongSleeveOptions,

  isLoading: false,

  actions: {
    submit(model, isValid, originalModel) {
      if (!isValid)
        return;

      const flash = this.get('flash');
      const user = this.get('session.user');
      const self = this;

      flash.clearMessages();

      return model.save().then(function() {
        flash.success('The personal information was successfully updated.');
        self.transitionToRoute('person.personal-info-show');
      }).catch(function (err) {
        console.log("SUBMIT error ", err);
        originalModel.get('errors').forEach((error) => {
          model.pushErrors(error.attribute,  error.message);
        });
        flash.warning('The information could not be updated.');
      })
    },
  }

});
