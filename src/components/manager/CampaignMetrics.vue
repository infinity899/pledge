<template>
<div v-if="project" class="insights-metrics">
  <div class="detail">
    <div>{{ getFundingTotal(project.total_pledged) }}</div>
    <div>{{ $t('manager.insights.categories.pledged') }}</div>
  </div>
  <div class="detail detail-even">
    <div>{{ `${getFundingPercentage()}%` }}</div>
    <div>{{ $t('manager.insights.categories.goal') }}</div>
  </div>
  <div class="break-mobile" />
  <!--  TODO: need to refactor breaks to accommodate conditional rendering of diff metrics -->
  <div v-if="status === 'open'" class="detail">
    <div>{{ getDays(project.end_time) }}</div>
    <div>{{ $t('manager.insights.categories.left') }}</div>
  </div>
  <div class="break-tablet" />
  <div class="detail" :class="status === 'open' ? 'detail-even' : ''">
    <div>{{ project.backer_count }}</div>
    <div>{{ $t('manager.insights.categories.backers') }}</div>
  </div>
  <div class="break-mobile" />
  <div class="detail" :class="status !== 'open' ? 'detail-even' : ''">
    <div>{{ `$${getAverage()}` }}</div>
    <div>{{ $t('manager.insights.categories.average') }}</div>
  </div>
  <div v-if="status === 'progress'" class="detail">
    <div>{{ `$${getAverage()}` }}</div>
    <div>{{ $t('manager.insights.categories.fee') }}</div>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';
import { formatWithCommas } from '@/utils/stringUtils';

export default {
  name: 'campaign-metrics',
  props: {
    project: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
  },
  methods: {
    getDays(date) {
      return date.diff(moment(), 'days');
    },
    getFundingPercentage() {
      const {
        total_pledged: totalPledged,
        funding_goal: fundingGoal,
      } = this.project;
      return parseInt(totalPledged / fundingGoal);
    },
    getAverage() {
      const {
        total_pledged: totalPledged,
        backer_count: backerCount,
      } = this.project;
      if(backerCount <= 0) {
        return 0;
      }
      return (totalPledged / backerCount).toFixed(2);
    },
    // Get funding total, abbreviated with M if over 1,000,000
    getFundingTotal(amount) {
      let formatted;
      if(amount > 1000000) {
        const abbrev = amount / 1000000;
        if(amount % 1000000 >= 100000) {
          formatted = abbrev.toFixed(1);
        } else {
          formatted = Math.floor(abbrev);
        }
        formatted = `${formatted}M`;
      } else {
        formatted = formatWithCommas(amount);
      }
      return `$${formatted}`;
    },
  },
};
</script>
