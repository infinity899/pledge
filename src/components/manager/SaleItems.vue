<template>
<div class="insights-content">
  <div class="insights-sale-items">
    <div class="insights-header">
      {{ $t('manager.insights.storefront.items_sold') }}
      <DateRangeSelect />
    </div>
    <InsightsList
      :items="rewardData"
      :listHeaders="rewardHeaders"
      tableClass="rewards-table"
    />
  </div>
</div>
</template>

<script>
import DateRangeSelect from '@/components/widget/DateRangeSelect.vue';
import InsightsList from '@/components/manager/InsightsList.vue';

export default {
  name: 'insights-sale-items',
  components: {
    InsightsList,
    DateRangeSelect,
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

.insights-sale-items {
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;

  .insights-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.rewards-table {
  table {
    th, td {
      &:nth-child(n+2) {
        text-align: right;
      }
    }
  }
}
</style>
