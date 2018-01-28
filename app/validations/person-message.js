import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  recipient_callsign: [
    validatePresence({ presence: true, message: "Please enter the ranger's callsign."}),
    validateLength({ min: 2 })
  ],

  subject: [
    validatePresence(true)
  ],

  body: [
    validatePresence({ presence: true, message: 'Please enter a message.'}),
    validateLength({ min: 5 })
  ],

};
