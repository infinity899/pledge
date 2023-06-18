<template>
<div class="review-confirm">
  <div class="general-info">
    <h5>{{ $t('checkout.address.title') }}</h5>
    <div class="info-section">
      <h5 class="label">
        {{ $t('checkout.address.name') }}
      </h5>
      <h5 class="value">
        {{ generalInfo.name }}
      </h5>
    </div>
    <div class="info-section">
      <h5 class="label">
        {{ $t('checkout.address.email') }}
      </h5>
      <h5 class="value">
        {{ generalInfo.email }}
      </h5>
    </div>
    <div class="info-section">
      <h5 class="label">
        {{ $t('checkout.address.shipping_address') }}
      </h5>
      <h5 class="value">
        <div>{{ generalInfo.shippingAddress.line1 }}</div>
        <div>{{ generalInfo.shippingAddress.line2 }}</div>
        <div>{{ generalInfo.shippingAddress.city }}</div>
        <div>{{ generalInfo.shippingAddress.country }}</div>
        <div>{{ generalInfo.shippingAddress.postal_code }}</div>
      </h5>
    </div>
  </div>
  <div class="payment-method">
    <h5>{{ $t('checkout.payment.title') }}</h5>
    <PLGWallet
      :walletBalance="walletBalance"
      :billingCost="billingCost"
      :initialAmount="fromWallet"
      :onChange="onChangePlgWallet"
    />
    <div v-if="paymentMethods" class="card-list">
      <div
        v-for="(card, index) in paymentMethods"
        :key="index"
        class="card"
      >
        <Radio
          v-model="selectedCardId"
          :radioId="`card-${card.id}`"
          :radioValue="card.id"
          :selectableInput="true"
        >
          <span class="subtitle">
            {{ $t('checkout.payment.card_ending_in', { last4: card.last4 }) }}
          </span>
        </Radio>
      </div>
      <div class="add-card" @click="goTo(1)">
        <span class="subtitle">
          {{ $t('checkout.payment.add_card') }}
        </span>
      </div>
    </div>
  </div>
  <button class="btn-submit" @click="onPlaceOrder">
    {{ $t('checkout.buttons.place_order') }}
  </button>
</div>
</template>

<script>
import Radio from '@/components/widget/Radio.vue';
import PLGWallet from './PLGWallet.vue';
import { getPaymentMethods, pledgeCheckout } from '@/utils/api';

export default {
  name: 'review-confirm',
  components: {
    PLGWallet,
    Radio,
  },
  props: {
    goTo: {
      type: Function,
      default: () => {},
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    paymentMethod: {
      type: Object,
      required: true,
    },
    walletBalance: {
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
  data() {
    return {
      paymentMethods: [],
      selectedCardId: 1,
      checkedPledge: null,
    };
  },
  computed: {
    generalInfo() {
      const profile = this.$store.getters.getProfile || {};
      return {
        name: profile.name,
        email: profile.email,
        shippingAddress: this.shippingAddress,
      };
    },
  },
  methods: {
    onChangePlgWallet(amount) {
      this.$emit('update:fromWallet', amount);
    },
    async getPaymentMethodsData() {
      try {
        const res = await getPaymentMethods();
        this.paymentMethods = res.data.payment_methods;
        this.selectedCardId = this.paymentMethod.id;
      } catch(err) {
        console.log(err);
      }
    },
    async onPlaceOrder() {
      try {
        const projectId = this.$route.params.id;
        const res = await pledgeCheckout(projectId);
        this.checkedPledge = res.data.pledge;
        this.onSubmit(this.checkedPledge);
      } catch(err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getPaymentMethodsData();
  },
};
</script>

<style lang="scss">
.review-confirm {
  .info-section {
    margin-top: 16px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;

    .label {
      color: $grey;
      width: 100%;
    }

    .value {
      width: 100%;
    }
  }
  .payment-method {
    .card {
      margin-top: 16px;
    }
    .add-card {
      padding: 12px 16px;
      border: 1px solid $border-light;
      margin-top: 16px;
      cursor: pointer;
    }
  }
}
</style>
