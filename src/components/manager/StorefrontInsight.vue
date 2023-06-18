<template>
<div class="insights-section storefront-insight">
  <Collapsible>
    <template v-slot:header>
      <div class="insights-summary">
        <div>
          <div class="summary-header">
            {{ $t('manager.insights.storefront.header') }}
          </div>
          <div class="summary-details">
            <div>{{ $tc('manager.insights.storefront.orders', allSales.orders) }}</div>
            <div>{{ $tc('manager.insights.storefront.sales', allSales.amount) }}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <StorefrontMetrics
        :project="project"
        :status="status"
      />
      <div class="insights-content">
        <div class="funding-progress">
          <div class="insights-header">
            {{ $t('manager.insights.storefront.sales') }}
            <DateRangeSelect />
          </div>
          <Graph
            :graphData="salesData"
            :start="project.start_time"
            :end="project.end_time"
            :goal="project.funding_goal"
            :numRows="5"
            :status="status"
            :type="'funding'"
            :topLineColor="status === 'progress' ? '#2E40EA' : 'green'"
            :topTextColor="status === 'progress' ? '#2E40EA' : '#E6E6E6'"
          />
        </div>
        <TopSaleItems :project="project" />
      </div>
      <SaleItems />
    </template>
  </Collapsible>
</div>
</template>

<script>
import Collapsible from '@/components/widget/Collapsible.vue';
import DateRangeSelect from '@/components/widget/DateRangeSelect.vue';
import StorefrontMetrics from '@/components/manager/StorefrontMetrics.vue';
import Graph from '@/components/manager/Graph.vue';
import TopSaleItems from '@/components/manager/TopSaleItems.vue';
import SaleItems from '@/components/manager/SaleItems.vue';

import { formatWithCommas } from '@/utils/stringUtils';

export default {
  name: 'storefront-insight',
  components: {
    Collapsible,
    DateRangeSelect,
    StorefrontMetrics,
    Graph,
    TopSaleItems,
    SaleItems,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    salesData: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    allSales() {
      return {
        amount: `$${formatWithCommas(18161)}`,
        orders: formatWithCommas(362),
      };
    },
  },
};
</script>

<style lang="scss">
.storefront-insight {
  border-bottom: 1px solid $border-light;

  .funding-progress .insights-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
