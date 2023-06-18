<template>
<div v-if="project" class="insights-metrics">
  <div class="detail">
    <div>{{ dailySales.amount }}<span class="cat">{{ $tc('manager.insights.storefront.orders', dailySales.orders) }}</span></div>
    <div>{{ $t('manager.insights.storefront.last_24h') }}</div>
  </div>
  <div class="break-mobile" />
  <div class="detail">
    <div>{{ monthlySales.amount }}<span class="cat">{{ $tc('manager.insights.storefront.orders', monthlySales.orders) }}</span></div>
    <div>{{ $t('manager.insights.storefront.last_30days') }}</div>
  </div>
  <div class="break-mobile" />
  <div class="detail">
    <div>{{ allSales.amount }}<span class="cat">{{ $tc('manager.insights.storefront.orders', allSales.orders) }}</span></div>
    <div>{{ $t('manager.insights.storefront.all_time') }}</div>
  </div>
</div>
</template>

<script>
import { formatWithCommas } from '@/utils/stringUtils';

export default {
  name: 'storefront-metrics',
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  computed: {
    dailySales() {
      return {
        amount: `${formatWithCommas(141)}`,
        orders: formatWithCommas(7),
      };
    },
    monthlySales() {
      return {
        amount: `$${formatWithCommas(891)}`,
        orders: formatWithCommas(41),
      };
    },
    allSales() {
      return {
        amount: `$${formatWithCommas(18161)}`,
        orders: formatWithCommas(362),
      };
    },
  },
};
</script>
