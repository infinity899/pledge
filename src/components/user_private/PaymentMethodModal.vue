<template>
<Modal
  :cancelable="true"
  :title="$t('settings.payment.create_payment_title')"
  :submitText="$t('settings.payment.buttons.add_card')"
  :expanded="false"
  class="payment-method-modal"
  @submit="handleSubmit"
  @cancel="toggleModal('convert')"
>
  <template v-slot:content>
    <div class="payment-method-create-modal-form-wrap">
      <div class="payment-content">
        <div class="form-control">
          <TitledInput
            id="card-number"
            v-model="cardNumber"
            :title="$t('settings.payment.labels.card_number')"
            :placeholder="$t('settings.payment.placeholders.card_number')"
            mask="#### #### #### ####"
            :errorMessage="cardNumberErrorMessage"
            @focusout="validate('cardNumber')"
            @input="clearError('cardNumberErrorMessage')"
          />
        </div>
        <div class="form-control">
          <TitledInput
            id="name"
            v-model="cardHolder"
            :title="$t('settings.payment.labels.cardholder_name')"
            :placeholder="$t('settings.payment.placeholders.cardholder_name')"
          />
        </div>
        <div class="form-control info-wrap">
          <TitledInput
            v-model="expiration"
            class="expiration"
            :title="$t('settings.payment.labels.expiration')"
            :placeholder="$t('settings.payment.placeholders.expiration')"
            mask="##/##"
            :errorMessage="expirationErrorMessage"
            @focusout="validate('expiration')"
            @input="clearError('expirationErrorMessage')"
          />
          <TitledInput
            v-model="securityCode"
            class="security-code"
            :title="$t('settings.payment.labels.security_code')"
            :placeholder="$t('settings.payment.placeholders.security_code')"
            mask="###"
            :errorMessage="securityCodeErrorMessage"
            @focusout="validate('securityCode')"
            @input="clearError('securityCodeErrorMessage')"
          />
          <TitledInput
            v-model="zipCode"
            class="zip"
            :title="$t('settings.payment.labels.zip_postal_code')"
            :placeholder="$t('settings.payment.placeholders.zip_postal_code')"
          />
        </div>
      </div>
      <div class="billing-content">
        <h5>{{ $t('settings.payment.billing_address') }}</h5>
        <div class="form-control">
          <TitledInput
            id="fullname"
            v-model="fullName"
            :title="$t('settings.payment.labels.fullname')"
            :placeholder="$t('settings.payment.placeholders.fullname')"
          />
        </div>
        <div class="form-control">
          <TitledInput
            id="address"
            v-model="address"
            :title="$t('settings.payment.labels.address')"
            :placeholder="$t('settings.payment.placeholders.address')"
          />
        </div>
        <div class="form-control">
          <TitledInput
            id="apartment"
            v-model="apartment"
            :title="$t('settings.payment.labels.apartment')"
            :placeholder="$t('settings.payment.placeholders.apartment')"
          />
        </div>
        <div class="form-control">
          <TitledInput
            id="city"
            v-model="city"
            :title="$t('settings.payment.labels.city')"
            :placeholder="$t('settings.payment.placeholders.city')"
          />
        </div>
        <div class="form-control info-wrap">
          <TitledSelect
            v-model="country"
            class="country"
            type="select"
            :options="countries()"
            :searchable="true"
            :title="$t('settings.payment.labels.country')"
            :placeholder="$t('settings.payment.placeholders.country')"
          />
          <TitledInput
            v-model="province"
            class="province"
            :title="$t('settings.payment.labels.province')"
            :placeholder="$t('settings.payment.placeholders.province')"
          />
          <TitledInput
            v-model="postalCode"
            class="postal-code"
            :title="$t('settings.payment.labels.postal_code')"
            :placeholder="$t('settings.payment.placeholders.postal_code')"
          />
        </div>
      </div>
      <div v-if="errorMessage" class="error">
        <span>{{ errorMessage }}</span>
      </div>
    </div>
  </template>
</Modal>
</template>

<script>
import moment from 'moment';
import Modal from '@/components/widget/Modal.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import TitledSelect from '@/components/widget/TitledSelect.vue';
import * as api from '@/utils/api';
import { Countries } from '@/utils/constants';

export default {
  name: 'payment-method-create-modal',
  components: {
    Modal,
    TitledInput,
    TitledSelect,
  },
  props: {
    toggleModal: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      cardNumber: '',
      cardNumberErrorMessage: '',
      cardHolder: '',
      expiration: '',
      expirationErrorMessage: '',
      securityCode: '',
      securityCodeErrorMessage: '',
      zipCode: '',
      fullName: '',
      address: '',
      apartment: '',
      city: '',
      country: '',
      province: '',
      postalCode: '',
      hasError: false,
      errorMessage: null,
    };
  },
  computed: {
    expirationDate() {
      return `20${this.expiration.slice(3, 5)}-${this.expiration.slice(0, 2)}-01T00:00:00`;
    },
  },
  methods: {
    countries() {
      return Countries;
    },
    validate(dataName) {
      if((!dataName || dataName === 'cardNumber') && (!this.cardNumber || this.cardNumber.length !== 19)) {
        this.cardNumberErrorMessage = this.$t('settings.payment.invalid_error_message', {
          label: this.$t('settings.payment.labels.card_number'),
        });
        this.hasError = true;
      }
      if(!dataName || dataName === 'expiration') {
        const date = moment(this.expiration, ['MM/YY'], true);
        if(!date.isValid() || date.diff(moment(), 'month', true) < 0) {
          this.expirationErrorMessage = this.$t('settings.payment.invalid_error_message', {
            label: this.$t('settings.payment.labels.expiration'),
          });
          this.hasError = true;
        }
      }
      if(!dataName || dataName === 'securityCode') {
        if(!this.securityCode || this.securityCode.length !== 3) {
          this.securityCodeErrorMessage = this.$t('settings.payment.invalid_error_message', {
            label: this.$t('settings.payment.labels.security_code'),
          });
          this.hasError = true;
        }
      }
    },
    clearError(errorName) {
      this.hasError = false;
      if(this[errorName] !== undefined) {
        this[errorName] = '';
      }
    },
    handleSubmit() {
      this.validate();
      if(this.hasError) {
        return;
      }
      const params = {
        card_number: this.cardNumber,
        cvv: this.securityCode,
        name: this.cardHolder,
        last4: this.cardNumber.slice(15, 19),
        expiration: this.expiration,
        address: {
          line1: this.address,
          line2: this.apartment,
          country: this.country,
          city: this.city,
          state: this.province,
          postal_code: this.postalCode,
          phone_number: '',
        },
      };
      api.createUserPaymentMethod(params)
        .then((res) => {
          const { payment_method: paymentMethod } = res.data;
          // @TODO: maybe API should return full information (as on GET request)?
          paymentMethod.expiration = this.expirationDate;
          this.$emit('paymentMethodCreated', paymentMethod);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
.payment-method-modal {
  .modal-top {
    height: 24px;
  }
  .modal-header {
    @include h3;
    text-align: center;
    margin: 16px 0 32px;
  }

  .payment-method-create-modal-form-wrap {
    padding-bottom: 30px;
  }

  .p-input-wrap {
    & > input {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .expiration {
      width: 35%;
    }
    .security-code {
      width: 13%;
    }
    .zip {
      width: 46%;
    }

    .country {
      width: 44%;
    }
    .province {
      width: 30%;
    }
    .postal-code {
      width: 22%;
    }

    @media (max-width: 575px) {
      flex-direction: column;
      > * {
        width: 100% !important;
      }
    }
  }
}

</style>
