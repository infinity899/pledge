<template>
<div v-if="project" class="insights-metrics">
  <div class="detail">
    <div>{{ getBackerConfidence() }}</div>
    <div>{{ $t('manager.insights.categories.confidence') }}</div>
  </div>
  <div class="detail">
    <div>{{ getYesVotes() }}<span class="cat">{{ getMaxYesVotes() }}</span></div>
    <div>{{ $t('manager.insights.categories.voting') }}</div>
  </div>
  <div class="break-mobile" />
  <div class="detail">
    <div>{{ getNextMilestone() }}<span class="cat">{{ $t('days') }}</span></div>
    <div>{{ $t('manager.insights.categories.next') }}</div>
  </div>
  <div class="break-tablet" />
  <div class="detail">
    <div>{{ `$${getFundsReceived()}` }}</div>
    <div>{{ $t('manager.insights.categories.received') }}</div>
  </div>
  <div class="break-mobile" />
  <div class="detail">
    <div>{{ `$${getEscrow()}` }}</div>
    <div>{{ $t('manager.insights.categories.escrow') }}</div>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';

export default {
  name: 'backer-metrics',
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  methods: {
    getBackerConfidence() {
      // TODO: how is backer confidence determined?
      return '77%';
    },
    getYesVotes() {
      // TODO: how will total yes votes be determined?
      return '23';
    },
    getMaxYesVotes() {
      return 'of 77';
    },
    getFundsReceived() {
      // TODO: how will funds received be determined?
      return '15,000';
    },
    getEscrow() {
      // TODO: how will escrow be determined?
      return '125,000';
    },
    getNextMilestone() {
      const { milestones } = this.project;
      const today = moment();
      const sorted = milestones.slice()
        .sort((m1, m2) => m1.date - m2.date)
        .filter(m => moment(m.date * 1000).isAfter(today));
      if(!sorted.length) return 0;
      const next = sorted[0].date * 1000;
      const days = moment(next).diff(moment(today), 'days');
      return days;
    },
  },
};
</script>
