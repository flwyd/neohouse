import {
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';

export default {
  identification: [
    validatePresence(true),
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 3, max: 40 })
  ]
};
