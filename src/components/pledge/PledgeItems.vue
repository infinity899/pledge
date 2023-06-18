<template>
<div v-if="pledge" class="pledge-items">
  <div
    v-for="(item, idx) in items"
    id="pledge_items_list"
    :key="idx"
  >
    <PledgeItem
      :item="item"
      @update:pledge="$emit('update:pledge', $event)"
    />
  </div>
  <div class="pledge-items-billing">
    <div class="pledge-billing-item">
      <h5 class="label">
        {{ $t('checkout.rewards.subtotal') }}
      </h5>
      <h5 class="value">
        {{ pledge.sub_total_usd | from_cents }}
      </h5>
    </div>
    <div v-if="shippingCost > 0" class="pledge-billing-item">
      <h5 class="label">
        {{ $t('checkout.rewards.estimated_shipping') }}
      </h5>
      <h5 class="value">
        {{ shippingCost | from_cents }}
      </h5>
    </div>
    <div v-if="fromWallet > 0" class="pledge-billing-item">
      <h5 class="label">
        {{ $t('checkout.payment.plg_wallet') }}
      </h5>
      <!-- eslint-disable vue-i18n/no-raw-text -->
      <h5 class="value">
        - {{ fromWallet | from_cents }}
      </h5>
      <!-- eslint-enable vue-i18n/no-raw-text -->
    </div>
    <div class="pledge-billing-total">
      <h4 class="label">
        {{ $t('checkout.rewards.total') }}
      </h4>
      <h2 class="value">
        {{ total | from_cents }}
      </h2>
    </div>
  </div>
</div>
</template>

<script>
import PledgeItem from '@/components/pledge/PledgeItem.vue';
import { sortPledgeItems } from '@/utils/objectUtils';

export default {
  name: 'PledgeItems',
  components: {
    PledgeItem,
  },
  props: {
    pledge: {
      type: Object,
      default: null,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    billingCost: {
      type: Number,
      default: 0,
    },
    fromWallet: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    items() {
      return this.pledge ? sortPledgeItems(this.pledge.products) : [];
    },
    total() {
      return this.billingCost - this.fromWallet;
    },
  },
  methods: {
    handleDonate() {
      // TODO
    },
  },
};
</script>

<style lang="scss">

.pledge-items {
  width: 100%;
  padding: 15px 0;

  .pledge-items-billing {
    border-top: 1px solid $border-light;
    .label {
      color: $grey2;
    }
  }
  .pledge-billing-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  .pledge-billing-total {
    border-top: 1px solid $border-light;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
  }
}
</style>
