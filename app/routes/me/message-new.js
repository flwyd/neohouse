import Route from '@ember/routing/route';
import PersonMixin from 'neohouse/mixins/person';

export default Route.extend(PersonMixin, {
  afterModel(model, transition) {
    const params = transition.queryParams;
    const replyTo = params.replyTo;
    let subject = params.subject;

    // Set the subject to 'Re: oldsubject' if its been replied to
    if (subject && !subject.toLowerCase().startsWith('re:')) {
      subject = `Re: ${subject}`;
    }

    const values = {
      recipient_callsign: replyTo,
      subject,
      message_from: model.person.get('message_from')
    };
    this.set('message', this.store.createRecord('person-message', values));
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('message', this.get('message'));
  }

});
