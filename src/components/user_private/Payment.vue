<template>
<div class="payments">
  <div class="page-help">
    <p class="p_large">
      {{ $t('settings.payment.help') }}
    </p>
  </div>
  <div class="page-content">
    <h3 class="page-title">
      {{ $t('settings.payment.title') }}
    </h3>
    <div class="add-payment-button" @click="showAddPaymentModal = !showAddPaymentModal">
      {{ $t('settings.payment.buttons.add_card') }}
    </div>
    <div class="payments-list">
      <div
        v-for="item in profile.payment_methods"
        :key="item.id"
        class="payment-item"
      >
        <div class="payment-item-info">
          <h4 class="payment-title">
            {{ $t('settings.payment.card_name', {'code': item.last4}) }}
          </h4>
          <p class="payment-expire">
            {{ $t('settings.payment.expires', {'date': formatExpireDate(item.expiration) }) }}
          </p>
        </div>
        <div class="payment-item-actions">
          <span v-if="item.default" class="payment-is-primary">
            {{ $t('settings.payment.buttons.primary') }}
          </span>
          <span
            v-if="!item.default"
            class="payment-make-primary"
            @click="setDefaultPayment(item)"
          >
            {{ $t('settings.payment.buttons.make_primary') }}
          </span>
          <span class="payment-remove" @click="removePaymentItem(item)">
            {{ $t('settings.payment.buttons.remove') }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <PaymentMethodModal
    v-if="showAddPaymentModal"
    :toggleModal="toggleModal"
    @paymentMethodCreated="showCreatedPayment"
  />
</div>
</template>

<script>
import PaymentMethodModal from '@/components/user_private/PaymentMethodModal.vue';
import * as api from '@/utils/api';
import { USER_SUCCESS } from '@/store/actions';

export default {
  name: 'payment',
  components: {
    PaymentMethodModal,
  },
  data() {
    return {
      showAddPaymentModal: false,
    };
  },
  computed: {
    profile() {
      return this.$store.getters.getProfile || {};
    },
  },
  methods: {
    formatExpireDate(dateString) {
      return this.$options.filters.expire_date(dateString);
    },
    removePaymentItem(item) {
      api.deletePaymentMethod(item)
        .then((res) => {
          if(res.status === 200) {
            const newPaymentMethods = this.profile.payment_methods.filter(e => e.id !== item.id);
            this.$store.commit(USER_SUCCESS, {
              ...this.profile,
              payment_methods: newPaymentMethods,
            });
          }
        });
    },
    setDefaultPayment(item) {
      api.setUserDefaultPaymentMethod(item)
        .then((res) => {
          if(res.status === 200) {
            const newPaymentMethods = this.profile.payment_methods.map(element => ({
              ...element,
              default: element.id === item.id,
            }));
            this.$store.commit(USER_SUCCESS, {
              ...this.profile,
              payment_methods: newPaymentMethods,
            });
          }
        });
    },
    toggleModal() {
      this.showAddPaymentModal = !this.showAddPaymentModal;
    },
    showCreatedPayment(item) {
      this.profile.payment_methods.push(item);
      this.$store.commit(USER_SUCCESS, this.profile);
      this.showAddPaymentModal = false;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.payments {
  display: flex;
  flex-direction: row-reverse;

  .page-help {
    width: 40%;
    margin: 56px 0 24px 25px;
    p {
      margin: 0;
      padding: 24px;
      background-color: #f4f5fe;
    }
  }
  .page-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 60%;
    margin: 40px 25px 24px 0;

    .page-title {
      margin: 16px 0;
    }

    .add-payment-button {
      @include button($main-black, large);
      min-width: 155px;
      margin: 16px 0;
    }

    .payments-list {
      width: 100%;

      .payment-item {
        border: 1px solid $border-lighter;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
        padding: 24px;
        margin: 24px 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .payment-expire {
          color: $black-med;
          margin: 8px 0 0;
        }
        .payment-item-actions {
          align-items: center;
          display: flex;
          margin: 16px 0;
          .payment-is-primary {
            @include link;
            color: $grey2;
            cursor: auto;
          }
          .payment-make-primary {
            @include link;
          }
          .payment-remove {
            @include link;
            color: $main-orange;
            margin-left: 32px;
          }
        }
      }
    }
  }

  @media (max-width: $tablet-width) {
    flex-direction: column;

    .page-help {
      width: 100%;
      margin: 24px 0 0 0;
    }
    .page-content {
      width: 100%;
      margin: 24px 0;
    }
  }

  hr {
    margin-bottom: 30px;
  }
}
</style>
