<template>
<div v-if="project" class="insights-topsale">
  <div class="insights-header">
    {{ $t('manager.insights.storefront.top_items_sold') }}
  </div>
  <div
    v-for="(item, index) in items"
    :key="index"
    class="item"
  >
    <div class="item-info">
      <!-- TODO: Replace with real item image -->
      <img :src="require('@/static/img/ic_category-8.png')">
      <h5>{{ item.reward.title }}</h5>
    </div>
    <div class="sales-info">
      <h5 class="quantity">
        {{ $tc('manager.insights.storefront.sold', item.total_orders) }}
      </h5>
      <h5 class="price">
        {{ item.sub_total_usd | from_cents }}
      </h5>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'insights-top-sale',
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // TODO: How to get top sold items analytics?
      items: [
        {
          sub_total_usd: 123400,
          total_orders: 48,
          reward: {
            title: '500ml Water Bottle',
          },
        },
        {
          sub_total_usd: 123400,
          total_orders: 48,
          reward: {
            title: '500ml Water Bottle',
          },
        },
        {
          sub_total_usd: 123400,
          total_orders: 48,
          reward: {
            title: '500ml Water Bottle',
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.insights-topsale {
  width: 35%;

  .item {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item-info {
      display: flex;
      align-items: center;
      img {
        width: 48px;
        height: 48px;
        margin-right: 16px;
      }
    }

    .sales-info {
      text-align: right;
      .price {
        color: $grey50;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: $tablet-width-large) {
    width: 100%;
    max-width: 600px;
    margin: 50px auto 0;
  }
}

</style>
