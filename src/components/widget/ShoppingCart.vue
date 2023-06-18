<template>
<div class="p-shopping-cart">
  <h4>{{ $t('pledge.cart.title') }}</h4>
  <div v-if="products.length > 0 || donation" class="cart-items">
    <div
      v-for="product in products"
      :key="product.id"
      class="item-wrap"
    >
      <div class="item">
        <span class="btn-remove" @click="onRemoveAll(product.reward)">
          <img :src="require('@/static/img/icons/ic_cart_remove.svg')">
          <span class="subheading">{{ $t('pledge.cart.remove') }}</span>
        </span>
        <div class="item-image" />
        <div class="item-info">
          <div class="item-name subtitle">
            {{ product.reward.title }}
          </div>
          <div class="item-variant subtitle">
            {{ $t('pledge.variant_placeholder') }}
          </div>
          <div class="item-quantity-cost">
            <h4 class="item-quantity">
              {{ product.quantity }}
            </h4>
            <UpDown
              :disabledDown="product.quantity <= 1"
              @up="onIncrease(product.reward)"
              @down="onDecrease(product.reward)"
            />
            <h4 class="item-cost">
              {{ product.usd_price | from_cents }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div v-if="donation" class="item-wrap">
      <div class="item item-donation">
        <span class="btn-remove" @click="onRemoveDonation">
          <img :src="require('@/static/img/icons/ic_cart_remove.svg')">
        </span>
        <div class="item-name subtitle">
          {{ $t('pledge.cart.donated') }}
        </div>
        <h4 class="item-cost">
          {{ donation.usd_price | from_cents }}
        </h4>
      </div>
    </div>
    <button class="btn-checkout" @click="$emit('checkout')">
      {{ $t('pledge.cart.checkout_button') }}
    </button>
  </div>
  <div v-else class="no-item">
    <p>{{ $t('pledge.cart.no_item_message') }}</p>
  </div>
  <button class="btn-close" @click="$emit('hideCart')">
    {{ $t('close') }}
  </button>
</div>
</template>

<script>
import UpDown from '@/components/svg/UpDown.vue';
import { RewardEvent, PledgeType, PledgeStatus } from '@/utils/constants';

export default {
  name: 'shopping-cart',
  components: {
    UpDown,
  },
  props: {
    projectId: {
      type: Number,
      default: null,
    },
    pledge: {
      type: Object,
      default: null,
    },
  },
  computed: {
    products() {
      if(this.pledge && this.pledge.status === PledgeStatus.SHOPPING) {
        return this.pledge.products
          .filter(product => (product.type === PledgeType.STANDARD))
          .sort((a, b) => (a.id - b.id));
      }
      return [];
    },
    donation() {
      if(this.pledge && this.pledge.status === PledgeStatus.SHOPPING) {
        return this.pledge.products.find(product => (product.type === PledgeType.DONATION));
      }
      return null;
    },
  },
  methods: {
    onRemoveAll(reward) {
      this.$emit('rewardEvent', {
        eventType: RewardEvent.REMOVE_ALL,
        projectId: this.projectId,
        reward,
      });
    },
    onIncrease(reward) {
      this.$emit('rewardEvent', {
        eventType: RewardEvent.ADD,
        projectId: this.projectId,
        reward,
      });
    },
    onDecrease(reward) {
      this.$emit('rewardEvent', {
        eventType: RewardEvent.REMOVE,
        projectId: this.projectId,
        reward,
      });
    },
    onRemoveDonation() {
      this.$emit('rewardEvent', {
        eventType: RewardEvent.DONATE,
        projectId: this.projectId,
        amount: 0,
      });
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-shopping-cart {
  width: 400px;
  max-width: 100vw;
  padding: 20px 50px;
  background: $white;
  border: 1px solid $border-light;
  line-height: normal;
  z-index: 1;
  .item-wrap {
    margin: 20px 0 30px;
    .item {
      display: flex;
      position: relative;
      margin-bottom: 30px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .item-image {
    width: 80px;
    height: 80px;
    background-color: #d8d8d8;
    margin-right: 16px;
  }
  .item-info {
    width: calc(100% - 96px);
    .item-name {
      font-size: 14px;
      margin-bottom: 5px;
      margin-right: 50px;
    }
    .item-variant {
      color: $grey;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .item-quantity-cost {
      display: flex;
      align-items: center;
    }
    .item-quantity {
      margin-right: 10px;
    }
    .item-cost {
      margin-left: auto;
    }
  }
  .item-donation .item-name {
    width: 80px;
    margin-right: 16px;
  }
  .btn-remove {
    position: absolute;
    top: 0;
    right: 0;
    fill: $grey;
    img {
      display: none;
    }
    span {
      text-transform: uppercase;
      color: $main-red;
    }
  }
  .btn-checkout {
    @include button($main-black, small, primary);
    width: 100%;
    margin-bottom: 10px;
  }
  .btn-close {
    @include button($main-black, small, secondary);
    background-color: $white;
    text-transform: uppercase;
    width: 100%;
  }
  .no-item p {
    @include subtitle;
    font-size: 14px;
    color: $grey;
    margin-top: 5px;
  }
  @media (max-width: $tablet-width) {
    padding: 20px;
    width: 375px;
    max-width: 100vw;

    .item-info {
      .item-name {
        margin-right: 20px;
      }
    }

    .btn-remove {
      img {
        display: block;
      }
      span {
        display: none;
      }
    }
  }
}
</style>
