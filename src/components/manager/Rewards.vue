<template>
<div class="insights-content">
  <div class="insights-rewards">
    <div class="insights-header">
      {{ $t('manager.insights.rewards.header') }}
      <div class="learn-more">
        {{ $t('manager.insights.rewards.learn') }}
      </div>
    </div>
    <InsightsList
      :items="rewardData"
      :listHeaders="rewardHeaders"
      tableClass="rewards-table"
      :selectable="false"
    />
  </div>
</div>
</template>

<script>
import InsightsList from '@/components/manager/InsightsList.vue';

export default {
  name: 'insights-rewards',
  components: {
    InsightsList,
  },
  data() {
    return {
      rewardData: [
        {
          reward: '2l Water Bottle',
          backers: 125,
          pledges: 142,
          average: 1.2,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          reward: '20 oz Water Bottle',
          backers: 77,
          pledges: 102,
          average: 1.8,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          reward: '1 Gallon Water Bottle',
          backers: 521,
          pledges: 642,
          average: 2.2,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          reward: 'Flint Water Bottle',
          backers: 77,
          pledges: 82,
          average: 2.8,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          reward: 'Non-Potable Water Bottle',
          backers: 152,
          pledges: 182,
          average: 0.8,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          reward: 'Leaky Water Bottle',
          backers: 251,
          pledges: 266,
          average: 3.2,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
      ],
      rewardHeaders: [
        { title: 'Reward', type: 'reward' },
        { title: 'Backers', type: 'backers' },
        { title: '# Pledges', type: 'pledges' },
        { title: 'Avg Quantity', type: 'average' },
        { title: '% of Pledged', type: 'percentage' },
        { title: '$ Pledged', type: 'amount_pledged' },
      ],
    };
  },
};
</script>

<style lang="scss">

table {
  th, td {
    &:first-child .p-checkbox-wrap {
      padding-bottom: 24px;
    }
  }
}
.insights-rewards {
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
}
.rewards-table {
  table {
    width: 100%;
    th, td {
      &:nth-child(n+2) {
        text-align: right;
      }
    }
    tr:nth-child(1) {
      > th:nth-child(n+2) {
        > div {
          float: right;
        }
      }
    }
  }
}
</style>
