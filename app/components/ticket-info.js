import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  @computed('myTicket')
  get congratSentence() {
    const myTicket = this.get('myTicket');
    let verb = "you've qualified for a";
    let trailing = "";

    switch (myTicket) {
      case 'claimed':
        verb = "you've claimed your";
        break;
      case 'banked':
        verb = 'you have a banked';
        break;
      case 'submitted':
        verb = "we have submitted your";
        trailing = " to the Burning Man Ticket Request System";
    }

    return `${verb} ${myTicket.humanType}${trailing}`;
  }
});
