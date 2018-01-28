import {
  validatePresence,
  validateLength,
  validateConfirmation,

} from 'ember-changeset-validations/validators';

export default {
  password: [
    validatePresence({ presence: true, message: 'Enter the new password.' }),
    validateLength({ min: 5, message: 'The password should be 5 characters or more.' })
  ],
  password_confirm: [
    validateConfirmation({ on: 'password', message: 'The password do not match.' })
  ]
};
