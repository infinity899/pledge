<template>
<div v-if="project" class="insights-details">
  <div class="detail">
    <div>{{ getFundingTotal(project.total_pledged) }}</div>
    <div>{{ $t('manager.insights.categories.pledged') }}</div>
  </div>
  <div class="detail">
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
  <div class="detail">
    <div>{{ project.backer_count }}</div>
    <div>{{ $t('manager.insights.categories.backers') }}</div>
  </div>
  <div class="break-mobile" />
  <div class="detail">
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
  name: 'metrics_details',
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
    getFundingTotal(amount) {
      const formatted = formatWithCommas(amount);
      return `$${formatted}`;
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.insights-details {
  display: flex;
  flex-flow: row wrap;

  .detail {
    margin-right: 24px;
    &:not(:last-child) {
      min-width: 150px;
      border-right: 1px solid $grey-light;
    }
    > div:first-child {
      @include h5;
    }
    > div:nth-child(2) {
      @include subheading;
      color: $grey-medium;
      font-size: 14px;
    }
    &:last-child {
      margin-right: 0;
      border-right: none;
      color: $grey;
    }
  }
  .break-tablet, .break-mobile {
    display: none;
    width: 100%;
    height: 0;
  }
  @media (max-width: $tablet-width-large) and (min-width: 578px) {
    .break-tablet {
      display: block;
    }
    .detail:nth-child(n+5) {
      padding-top: 40px;
    }
    .detail:nth-child(4) {
      margin-right: 0;
      border-right: none;
    }
  }
  @media (max-width: 577px) {
    .detail {
      width: 50%;
      margin: 0;
      padding-left: 24px;
      &:last-child {
        border-right: 1px solid $grey-light;
      }
    }
    .detail:nth-child(n+3) {
      padding-top: 40px;
    }
  }
}

.cat {
  color: $grey-medium;
  margin-left: 5px;
}

</style>
