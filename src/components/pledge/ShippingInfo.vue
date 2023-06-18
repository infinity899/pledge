<template>
<form class="shipping-info" @submit="onContinue">
  <div
    v-for="section in formModel"
    :key="section.key"
    class="info-section"
  >
    <!-- [TODO] let the user choose from a list of possible shipping addresses -->
    <h5>{{ $t(`checkout.address.${section.key}`) }}</h5>
    <FormBuilder
      :labels="$t('checkout.form')"
      :formModel="section"
      :fieldData="shippingAddress"
      @validate="onValidateEvent"
    />
  </div>
  <Checkbox
    :item="{ label: $t('checkout.address.save_address'), checked: saveForLater }"
    :onCheck="onClickSaveForLater"
  />
  <button class="btn-submit" :disabled="!isValidated">
    {{ $t('checkout.buttons.continue') }}
  </button>
</form>
</template>

<script>
import FormBuilder from '@/components/widget/FormBuilder.vue';
import Checkbox from '@/components/widget/Checkbox.vue';
import { createShippingAddress, removeShippingAddress } from '@/utils/api';
import {
  validateAddress,
  validatePostalCode,
  validateWords,
  validatePhone,
} from '@/utils/stringUtils';
import { TOGGLE_SAVE_ADDRESS, USER_REQUEST } from '@/store/actions';

const formModel = [
  {
    key: 'contact_info',
    fields: [
      { key: 'phone_number', autocomplete: 'tel', validator: validatePhone },
    ],
  },
  {
    key: 'shipping_address',
    fields: [
      { key: 'line1', autocomplete: 'address-line1', validator: validateAddress },
      { key: 'line2', autocomplete: 'address-line2', validator: validateAddress, optional: true },
      { key: 'city', autocomplete: 'address-level2', validator: validateWords },
      { key: 'country', autocomplete: 'country-name', style: 'one-third', validator: validateWords },
      { key: 'state', autocomplete: 'address-level', style: 'one-third', validator: validateWords },
      { key: 'postal_code', autocomplete: 'postal-code', style: 'one-third', validator: validatePostalCode },
    ],
  },
];

const flattedFormModel = formModel.map(m => m.fields).flat();

export default {
  name: 'shipping-info',
  components: {
    FormBuilder,
    Checkbox,
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      formModel,
      shippingAddress: {},
      errors: {},
      isFormValidated: {},
    };
  },
  computed: {
    saveForLater() {
      return this.$store.getters.getSaveAddressStatus;
    },
    isValidated() {
      return Object.values(this.isFormValidated)
        .reduce((acc, curValue) => acc && curValue, true);
    },
    isChanged() {
      return flattedFormModel.reduce((acc, field) => (
        acc || (this.shippingAddress[field.key] !== this.defaultShippingAddress[field.key])
      ), false);
    },
    defaultShippingAddress() {
      const defaultValue = flattedFormModel.map(({ key }) => ({ [key]: '' }));

      if(this.$store.getters.isProfileLoaded) {
        const { shipping_addresses: shippingAddresses } = this.$store.getters.getProfile;
        return shippingAddresses[shippingAddresses.length - 1] || defaultValue;
      }
      return defaultValue;
    },
  },
  watch: {
    defaultShippingAddress() {
      this.shippingAddress = { ...this.defaultShippingAddress };
    },
  },
  methods: {
    onClickSaveForLater() {
      this.$store.dispatch(TOGGLE_SAVE_ADDRESS);
    },
    onValidateEvent($event) {
      this.$set(this.isFormValidated, $event.id, $event.val);
    },
    async onContinue(e) {
      e.preventDefault();
      try {
        if(this.isValidated) {
          if(this.isChanged && this.saveForLater) {
            const res = await createShippingAddress(this.shippingAddress);
            this.shippingAddress = res.data.address;
            this.$store.dispatch(USER_REQUEST, true);
          }
          if(!this.isChanged && !this.saveForLater) {
            // remove address if the saveForLater checkbox is unchecked
            await removeShippingAddress(this.shippingAddress.id);
            // update shipping address from server
            this.$store.dispatch(USER_REQUEST, true);
          }
          this.onSubmit(this.shippingAddress);
        }
      } catch(err) {
        console.log(err);
      }
    },
  },
  mounted() {
    let formState = false;

    if(this.$store.getters.isProfileLoaded) {
      this.shippingAddress = { ...this.defaultShippingAddress };
      formState = true;
    }

    formModel
      .map(s => s.key)
      .forEach(k => this.$set(this.isFormValidated, k, formState));
  },
};
</script>

<style lang="scss">
.shipping-info {
  .info-section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 24px;

    h5 { width: 100%; }

    .one-third {
      width: 33.33%;
      padding-right: 12px;

      &:last-child { padding-right: 0; }
    }
  }

  @media (max-width: $mobile-width) {
    .one-third {
      width: 100%;
    }
  }
}
</style>
