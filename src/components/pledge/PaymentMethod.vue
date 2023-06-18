<template>
<form class="payment-method" @submit="onContinue">
  <div class="info-section">
    <h5>{{ $t('checkout.payment.plg_wallet') }}</h5>
    <PLGWallet
      :walletBalance="walletBalance"
      :billingCost="billingCost"
      :onChange="onChangePlgWallet"
    />
  </div>
  <div class="info-section">
    <h5>{{ $t('checkout.payment.credit_debit_card') }}</h5>
    <TitledInput
      v-model="paymentMethod.card_number"
      placeholder="0000 0000 0000 0000"
      :title="$t('checkout.payment.card_number')"
      mask="#### #### #### ####"
      autocomplete="cc-number"
    />
    <TitledInput
      v-model="paymentMethod.name"
      :title="$t('checkout.payment.name')"
      autocomplete="cc-name"
    />
    <div class="expire-cvv">
      <TitledInput
        v-model="paymentMethod.expiration"
        class="expire-date"
        :title="$t('checkout.payment.expiration')"
        mask="##/##"
        autocomplete="cc-exp"
      />
      <TitledInput
        v-model="paymentMethod.cvv"
        class="cvv"
        :title="$t('checkout.payment.cvv')"
        mask="###"
        autocomplete="cc-cs"
      />
    </div>
    <button type="submit" class="btn-submit" :disabled="!isValidated">
      {{ $t('checkout.buttons.continue') }}
    </button>
  </div>
</form>
</template>

<script>
import moment from 'moment';
import TitledInput from '@/components/widget/TitledInput.vue';
import PLGWallet from './PLGWallet.vue';
import { createPaymentMethod } from '@/utils/api';
import { copyFields } from '@/utils/objectUtils';

const fieldNames = ['card_number', 'name', 'expiration', 'cvv', 'id', 'last4'];
const validationFieldNames = ['card_number', 'name', 'expiration', 'cvv'];

export default {
  name: 'payment-method',
  components: {
    TitledInput,
    PLGWallet,
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
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
      paymentMethod: {
        card_number: '',
        name: '',
        expiration: '',
        cvv: '',
      },
      errors: {},
    };
  },
  computed: {
    isValidated() {
      for(let i = 0; i < validationFieldNames.length; i += 1) {
        const fieldName = validationFieldNames[i];
        if(!this.validateField(fieldName)) {
          return false;
        }
      }
      return true;
    },
    isChanged() {
      for(let i = 0; i < validationFieldNames.length; i += 1) {
        const fieldName = validationFieldNames[i];
        if(this.paymentMethod[fieldName] !== this.defaultPaymentMethod[fieldName]) {
          return true;
        }
      }
      return false;
    },
    defaultPaymentMethod() {
      if(this.$store.getters.isProfileLoaded) {
        const { payment_methods: paymentMethods } = this.$store.getters.getProfile;
        // Default payment method selection logic
        // 1. Find a default payment method.
        // 2. If not found, find a verified one.
        // 3. If not found again, return last used payment method.
        let defaultMethod = paymentMethods.find(paymentMethod => paymentMethod.default)
          || paymentMethods.find(paymentMethod => paymentMethod.verified)
          || paymentMethods[paymentMethods.length - 1]
          || {};

        if(defaultMethod) {
          defaultMethod = Object.assign({}, defaultMethod, {
            expiration: moment(defaultMethod.expiration).format('MM/YY'),
          });
        }

        return defaultMethod;
      }
      return {};
    },
  },
  watch: {
    defaultPaymentMethod() {
      this.paymentMethod = copyFields(this.defaultPaymentMethod, fieldNames);
    },
  },
  methods: {
    onChangePlgWallet(amount) {
      this.$emit('update:fromWallet', amount);
    },
    validateField(fieldName, errorMessage) {
      const fieldValue = this.paymentMethod[fieldName];
      if(!fieldValue) {
        if(errorMessage) { this.errors[fieldName] = errorMessage }
        return false;
      }
      return true;
    },
    async onContinue(e) {
      e.preventDefault();
      try {
        if(this.isValidated) {
          if(this.isChanged) {
            // TODO: Add checkbox for "useShippingForBilling" option
            const res = await createPaymentMethod({
              ...this.paymentMethod,
              useShippingForBilling: true,
            });
            this.paymentMethod = {
              // Combine with payment_method_brief data
              ...this.paymentMethod,
              ...copyFields(res.data.payment_method, fieldNames),
            };
          }
          this.onSubmit(this.paymentMethod);
        }
      } catch(err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.paymentMethod = copyFields(this.defaultPaymentMethod, fieldNames);
  },
};
</script>

<style lang="scss">
.payment-method {
  .info-section {
    margin-bottom: 32px;
  }
  .expire-cvv {
    display: flex;
    margin-top: -16px;
    .expire-date {
      margin-right: 12px;
      width: 190px;
    }
    .cvv {
      width: 80px;
    }
  }
}
</style>
