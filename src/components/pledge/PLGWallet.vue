<template>
<div class="plg-wallet">
  <Checkbox
    :item="{ checked: useWallet, label: `${$t('checkout.payment.use_wallet')} ($${usdBalance.toLocaleString()})`}"
    :onCheck="onCheckWallet"
  />
  <TitledInput :hasIcon="true" :value="usdAmount" @input="onInput" />
</div>
</template>

<script>
import Checkbox from '@/components/widget/Checkbox';
import TitledInput from '@/components/widget/TitledInput';

export default {
  name: 'plg-wallet',
  components: {
    Checkbox,
    TitledInput,
  },
  props: {
    walletBalance: {
      type: Number,
      default: 0,
    },
    billingCost: {
      type: Number,
      default: 0,
    },
    initialAmount: {
      type: Number,
      default: 0,
    },
    onChange: {
      type: Function,
      default: () => (() => {}),
    },
  },
  data() {
    return {
      amount: 0,
      useWallet: false,
    };
  },
  computed: {
    usdBalance() {
      return this.walletBalance ? this.walletBalance / 100 : 0;
    },
    usdAmount() {
      return this.amount ? this.amount / 100 : 0;
    },
  },
  methods: {
    onInput(value) {
      const amount = (value || 0) * 100;
      this.updateAmount(amount);
    },
    onCheckWallet(item) {
      this.useWallet = !item.checked;
      const amount = this.useWallet ? Math.min(this.walletBalance, this.billingCost) : 0;
      this.updateAmount(amount);
    },
    updateAmount(amount) {
      this.amount = parseInt(amount, 10) || 0;
      this.useWallet = this.amount > 0;
      this.onChange(this.amount);
    },
  },
  mounted() {
    this.updateAmount(this.initialAmount);
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.plg-wallet {
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  border: 1px solid $border-light;
  margin-top: 16px;
  padding-right: 16px;
  .p-checkbox-wrap {
    .p-checkbox {
      display: flex;
      height: 48px;
      align-items: center;
      padding-left: 16px;
      .checkmark {
        position: relative;
        margin-right: 8px;
        top: 0;
      }
      .checkbox-text {
        @include subtitle;
        color: $grey2;
        margin-top: 3px;
      }
    }
  }
  .p-input-wrap {
    margin: 0;
    margin-left: auto;
    .p-input {
      height: 24px;
      padding: 0 0 0 16px;
      border: none;
      width: 72px;
      border-bottom: 1px solid $border-light;
      color: $grey2;
    }
    .input-icon-dollar {
      left: 0;
      top: 3px;
    }
  }
}
</style>
