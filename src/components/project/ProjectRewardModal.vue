<template>
<Modal
  class="project-reward-modal"
  :title="$t('project.trust.reward_modal.title')"
  :expanded="false"
  :submitable="false"
  @cancel="toggleModal('reward')"
>
  <template v-slot:content>
    <div class="reward-header">
      <PledgeItem
        v-for="(item, idx) in items"
        :key="idx"
        :item="item"
        :changeable="!projectActive"
        @update:pledge="$emit('update:pledge', $event)"
      />
      <div v-if="!projectActive" class="reward-header-button">
        <button @click="$emit('addMoreRewards')">
          {{ $t('project.trust.reward_modal.add_more') }}
        </button>
      </div>
    </div>
    <div class="reward-body">
      <div class="reward-pricing-details">
        <div class="reward-pricing-subtotal">
          <p class="reward-label">
            {{ $t('project.trust.reward_modal.pricing_subtotal') }}
          </p>
          <p class="reward-details">
            {{ subtotal | from_cents }}
          </p>
        </div>
        <div class="reward-pricing-shipping">
          <p class="reward-label">
            {{ $t('project.trust.reward_modal.estimated_shipping') }}
          </p>
          <div class="reward-details">
            {{ shippingPrice | from_cents }}
          </div>
        </div>
      </div>
      <div class="reward-shipping-details-wrap">
        <div class="reward-total-price-wrap">
          <div class="reward-shipping-details">
            <h4 class="reward-total-label">
              {{ $t('project.trust.reward_modal.total') }}
            </h4>
            <h2 class="reward-total-price">
              {{ (subtotal + shippingPrice) | from_cents }}
            </h2>
          </div>
        </div>
        <div class="reward-shipping-info-wrap">
          <div class="reward-shipping-details">
            <div class="reward-label">
              {{ $t('project.trust.reward_modal.email') }}
            </div>
            <div class="reward-details">
              {{ $t('project.trust.reward_modal.placeholder_email') }}
            </div>
          </div>
          <div class="reward-shipping-details">
            <div class="reward-label">
              {{ $t('project.trust.reward_modal.name') }}
            </div>
            <div class="reward-details">
              {{ $t('project.trust.reward_modal.placeholder_name') }}
            </div>
          </div>
          <div class="reward-shipping-details">
            <div class="reward-label">
              {{ $t('project.trust.reward_modal.shipping_address') }}
            </div>
            <div class="reward-details reward-details-address">
              {{ $t('project.trust.reward_modal.placeholder_address') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reward-footer">
      <button class="btn-change-address" @click="$emit('unimplemented')">
        {{ $t('project.trust.reward_modal.cta') }}
      </button>
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';
import PledgeItem from '@/components/pledge/PledgeItem.vue';
import { sortPledgeItems } from '@/utils/objectUtils';

export default {
  name: 'project-trust-modal',
  components: {
    Modal,
    PledgeItem,
  },
  props: {
    pledge: {
      type: Object,
      default: null,
    },
    projectActive: Boolean,
    toggleModal: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      shippingPrice: 1000, // TODO -- where do we get this from?
    };
  },
  computed: {
    items() {
      return this.pledge ? sortPledgeItems(this.pledge.products) : [];
    },
    subtotal() {
      return this.pledge ? this.pledge.sub_total_usd : 0;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
.project-reward-modal {
  .modal-inner {
    margin-top: 80px;
    max-width: 680px;
  }
  .modal-header {
    @include h3;
    text-align: left;
    margin-bottom: 16px;
  }

  .reward-label {
    color: grey;
  }

  .reward-header {
    .reward-image {
      display: flex;
      margin-right: 16px;
      img {
        width: 72px;
        height: 72px;
      }
    }
    .reward-title {
      flex-basis: content;
      margin-right: 40px;
    }
    .reward-price {
      margin-left: auto;
    }
    .reward-header-button {
      margin-top: 10px;
      button {
        @include link;
        text-transform: uppercase;
        font-size: 12px;
      }
    }
  }

  .reward-pricing-details {
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    margin-top: 24px;
    border-top: 1px solid $border-light;
    border-bottom: 1px solid $border-light;

    .reward-pricing-subtotal, .reward-pricing-shipping {
      @include h5;
      display: flex;
      justify-content: space-between;
    }
    .reward-pricing-subtotal {
      margin-bottom: 16px;
    }
  }

  .reward-shipping-details-wrap {
    margin: 24px 0;
    display: flex;
    justify-content: space-between;

    .reward-total-price-wrap {
      width: 200px;
      order: 2;
      margin-bottom: 24px;
      align-items: center;
    }

    .reward-shipping-details {
      @include h5;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .reward-total-label {
      color: $grey;
      vertical-align: middle;
      line-height: 42px;
    }
    .reward-total-price {
      margin-left: auto;
    }
    .reward-label {
      width: 150px;
    }
    .reward-details {
      width: 200px;
    }
  }

  .reward-footer {
    .btn-change-address {
      @include link;
      margin-top: 32px;
      text-transform: uppercase;
      font-size: 12px;
    }
  }

  @media (max-width: $tablet-width - 1px) {
    .modal-inner {
      padding: 0 20px 40px 20px;
      .modal-top {
        margin-right: -20px;
      }
    }
    .reward-shipping-details-wrap {
      display: block;
      .reward-total-price-wrap {
        width: unset;
        border-bottom: 1px solid $border-light;
      }
    }
    .reward-footer button {
      margin-top: 0;
    }
  }
}
</style>
