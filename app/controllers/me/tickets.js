import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';
import moment from 'npm:moment';

import { config } from 'neohouse/utils/config';
import { PersonStatus } from 'neohouse/constants/person_status';

export default Controller.extend({
  get ticketsDisabled() {
    return !config('TicketsAndStuffEnable');
  },

  @computed('person.status')
  get isAuditorOrPastProspective() {
    return this.get('person.isAuditorOrPastProspective');
  },

  @computed('person.status')
  get wapDisabled() {
    const status = this.get('person.status');
    return (status == PersonStatus.PROSPECTIVE || status == PersonStatus.ALPHA);
  },

  get submitDate() {
    // Return as Saturday September 10th, 2018
    return moment(config('TAS_SubmitDate')).format('dddd MMMM Do, YYYY');
  },

  get submitTime() {
    // Return as 24 hour - hour:minute
    return moment(config('TAS_SubmitDate')).format('HH:mm');
  },

  get accepting() {
    return (config('TAS_TICKETS') == 'accept'
          || config('TAS_VP') == 'accept'
          || config('TAS_WAP') == 'accept'
          || config('TAS_WAPSO') == 'accept');
  }
});
