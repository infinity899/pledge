<template>
<Modal
  :cancelable="true"
  title=""
  :submitText="$t('wallet.convert_submit')"
  :expanded="false"
  @submit="handleSubmit"
  @cancel="toggleModal('convert')"
>
  <template v-slot:content>
    <div class="modal-header">
      {{ $t('wallet.converting', { 'code': fromCurrency }) }}
    </div>
    <h4>{{ $t('wallet.convert_amount', { 'code': fromCurrency }) }}</h4>
    <div class="info-text">
      {{ $t('wallet.converting_help') }}
    </div>
    <div class="convert-form">
      <div class="input-amount">
        <TitledInput
          v-model="fromValue"
          type="number"
          step=".01"
          :title="$t('wallet.convert_amount', { 'code': fromCurrency })"
          :placeholder="$t('wallet.convert_amount', { 'code': fromCurrency })"
          :suffix="fromCurrency"
          @input="handleChange"
        />
        <slot name="errorMessagesSlot">
          <div v-if="fromValueErrors.length">
            <p
              v-for="(error, key) in fromValueErrors"
              :key="key"
              class="error-message"
            >
              {{ error }}
            </p>
          </div>
          <div v-else class="error-placeholder" />
        </slot>
      </div>
    </div>
    <div class="available-currency">
      <h5>{{ $t('wallet.available') }}</h5>
      <div class="h5">
        {{ wallet.max }}
      </div>
    </div>
    <hr>
    <div class="total-converted">
      <h5>{{ $t('wallet.total_converted', { 'code': toCurrency }) }}</h5>
      <!-- eslint-disable vue-i18n/no-raw-text -->
      <h1>{{ toValue }} {{ toCurrency }}</h1>
      <!-- eslint-enable vue-i18n/no-raw-text -->
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';
import TitledInput from '@/components/widget/TitledInput.vue';

export default {
  name: 'wallet-convert-modal',
  components: {
    Modal,
    TitledInput,
  },
  props: {
    toggleModal: {
      type: Function,
      default: () => {},
    },
    fromCurrency: {
      type: String,
      default: null,
    },
    toCurrency: {
      type: String,
      default: null,
    },
    wallet: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      conversionRate: 1.23,
      fromValue: 50,
      fromValueErrors: [],
      toValue: Math.round(50 / 1.23 * 100) / 100,
    };
  },
  methods: {
    validateFrom() {
      this.fromValueErrors = [];
      if(this.fromValue < 50) {
        this.fromValueErrors.push(this.$t('wallet.validation.min', {
          amount: 50,
          code: this.fromCurrency,
        }));
      } else if(this.fromValue > this.wallet.max) {
        this.fromValueErrors.push(this.$t('wallet.validation.max', {
          amount: this.wallet.max,
          code: this.fromCurrency,
        }));
      }
    },
    handleChange(val) {
      this.fromValue = Math.round(val * 100) / 100;
      this.toValue = Math.round(this.fromValue / this.conversionRate * 100) / 100;
      this.validateFrom();
    },
    handleSubmit() {
      if(!this.fromValueErrors.length) {
        // @TODO: submit form
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'widgets.scss';

.modal-header {
  text-align: center;
}

.info-text {
  @include p_small;
  color: $black-med;
}

h5 {
  color: #7c7c7e;
}

.convert-form {
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .input-amount {
    width: 100%;
    position: relative;
    .error-message {
      font-size: 12px;
      font-weight: 500;
      &::before {
        content: ' ';
        background-image: url('../../static/img/icons/ic_close_red.png');
        opacity: 1;
        width: 10px;
        height: 10px;
        display: block;
        background-size: cover;
        float: left;
        margin: 3px;
      }
    }
    .error-placeholder {
      margin-bottom: 20px;
    }
  }
}
.available-currency {
  margin: 16px 0 24px;
}
.available-currency,
.total-converted {
  display: flex;
  justify-content: space-between;
}
.total-converted {
  margin-bottom: 40px;
}
</style>
