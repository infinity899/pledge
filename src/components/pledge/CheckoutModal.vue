<template>
<Modal
  class="checkout-modal"
  :cancelable="false"
  :submitable="false"
  :expanded="true"
  :showClose="false"
>
  <template v-slot:expandedHeader>
    <div class="expanded-header container">
      <div class="btn-back" @click="goBack">
        <Arrow :back="true" />
        <span class="button_small_text">
          {{ $t('checkout.buttons.back') }}
        </span>
      </div>
      <Logo :showLabel="false" />
      <div />
    </div>
  </template>
  <template v-slot:content>
    <div v-if="pledge && !showSucess" class="checkout container">
      <div class="checkout-form">
        <h2>{{ $t('checkout.title') }}</h2>
        <Stepper
          :steps="stepTitles"
          :currentStep="currentStepIdx"
          :onStep="onStep"
        />
        <keep-alive>
          <component
            :is="currentStep.component"
            :onSubmit="onSubmit"
            :goTo="goTo"
            :shippingAddress="shippingAddress"
            :paymentMethod="paymentMethod"
            :pledge="pledge"
            :shippingCost="shippingCost"
            :billingCost="billingCost"
            :walletBalance="walletBalance"
            :fromWallet="fromWallet"
            @update:pledge="onUpdatePledge"
            @update:fromWallet="fromWallet = $event"
          />
        </keep-alive>
      </div>
      <div class="checkout-right">
        <div class="checkout-note">
          <div class="checkout-note-title">
            {{ $t('checkout.note_title') }}
          </div>
          <div>{{ $t('checkout.note_text') }}</div>
        </div>
        <div class="checkout-items">
          <h3>{{ $t('checkout.rewards.title') }}</h3>
          <PledgeItems
            :pledge="pledge"
            :shippingCost="shippingCost"
            :billingCost="billingCost"
            :fromWallet="fromWallet"
            @update:pledge="onUpdatePledge"
          />
        </div>
      </div>
    </div>
    <CheckoutSuccess
      v-if="showSucess"
      @done="$emit('close:success')"
    />
  </template>
</Modal>
</template>

<script>
import Stepper from '@/components/pledge/Stepper.vue';
import PledgeItems from '@/components/pledge/PledgeItems.vue';
import ShippingInfo from '@/components/pledge/ShippingInfo.vue';
import PaymentMethod from '@/components/pledge/PaymentMethod.vue';
import ReviewConfirm from '@/components/pledge/ReviewConfirm.vue';
import CheckoutSuccess from '@/components/pledge/CheckoutSuccess.vue';
import Logo from '@/components/nav/Logo.vue';
import Arrow from '@/components/svg/Arrow.vue';
import Modal from '@/components/widget/Modal.vue';
import { getPledge } from '@/utils/api';

export default {
  name: 'checkout',
  components: {
    Arrow,
    Logo,
    Stepper,
    PledgeItems,
    ShippingInfo,
    PaymentMethod,
    ReviewConfirm,
    CheckoutSuccess,
    Modal,
  },
  data() {
    return {
      steps: [
        { title: this.$t('checkout.address.title'), component: 'ShippingInfo' },
        { title: this.$t('checkout.payment.title'), component: 'PaymentMethod' },
        { title: this.$t('checkout.review_confirm.title'), component: 'ReviewConfirm' },
      ],
      currentStepIdx: 0,
      shippingAddress: null,
      paymentMethod: null,
      pledge: null,
      shippingCost: 1000,
      walletBalance: 150,
      fromWallet: 0,
      showSucess: false,
    };
  },
  computed: {
    stepTitles() {
      return this.steps.map(step => (step.title));
    },
    currentStep() {
      return this.steps[this.currentStepIdx];
    },
    billingCost() {
      return this.pledge.sub_total_usd + this.shippingCost;
    },
  },
  methods: {
    goBack() {
      if(this.currentStepIdx > 0) {
        this.currentStepIdx -= 1;
      } else {
        this.$emit('close:incomplete');
      }
    },
    goNext() {
      if(this.currentStepIdx < (this.steps.length - 1)) {
        this.currentStepIdx += 1;
      } else {
        this.showSucess = true;
      }
    },
    goTo(stepIdx) {
      if(stepIdx >= 0 && stepIdx <= 2) {
        this.currentStepIdx = stepIdx;
      }
    },
    onStep(index) {
      if(index < this.currentStepIdx) {
        this.goTo(index);
      }
    },
    onSubmit(data) {
      const { currentStepIdx } = this;
      if(currentStepIdx === 0) {
        this.shippingAddress = data;
      } else if(currentStepIdx === 1) {
        this.paymentMethod = data;
      } else if(currentStepIdx === 2) {
        this.confirmData = data;
      }
      this.goNext();
    },
    async getPledgeData() {
      const projectId = this.$route.params.id;
      const pledge = await getPledge(projectId);
      this.pledge = pledge;
    },
    onUpdatePledge(data) {
      this.$set(this.pledge, 'products', data.products);
    },
  },
  mounted() {
    this.getPledgeData();
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.checkout-modal {
  padding-bottom: 0;
  overflow-x: hidden;

  .btn-back {
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      margin-bottom: 4px;
    }
    span {
      @include subheading;
      margin-left: 8px;
    }
  }

  .expanded-header {
    padding-left: 60px;
    padding-right: 60px;
  }

  .modal-inner {
    max-width: 100%;
  }

  .checkout {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 48px;

    .checkout-form,
    .checkout-items,
    .checkout-note {
      width: 100%;
    }

    .checkout-right {
      display: flex;
      flex-direction: column;
    }

    .checkout-note,
    .checkout-items {
      padding: 30px 40px 30px;
      margin-left: 60px;
    }

    .checkout-note {
      @include p_large;
      background-color: $section-highlight;
      .checkout-note-title {
        font-family: $font-title;
        font-weight: 700;
      }
      > div {
        padding-right: 8px;
      }
    }

    .checkout-items {
      border: 1px solid $border-light;
      height: 100%;
      min-width: 560px;
      margin-top: 16px;
    }

    .checkout-form {
      .p-stepper-prev {
        cursor: pointer;
      }
      .btn-submit {
        @include button($main-blue, full);
        display: block;
        margin-top: 64px;
      }
    }
  }

  @media (max-width: $desktop-width-small) {
    .checkout {
      flex-direction: column-reverse;
      .checkout-note {
        display: none;
      }
      .checkout-items {
        margin-top: unset;
        margin-left: unset;
        border: none;
        padding: unset;
        order: -1;
        margin-bottom: 40px;
        min-width: unset;

        h3 {
          @include h2;
        }
      }
    }
  }

  @media (max-width: $tablet-width) {
    .expanded-header {
      padding: 20px 20px 0 20px;
    }
    .modal-inner {
      padding: 0 20px 20px;
    }
  }

  @media (max-width: $mobile-width) {
    .checkout {
      flex-direction: column;
      .checkout-form .btn-submit {
        margin-top: 40px;
      }
    }
  }
}
</style>
