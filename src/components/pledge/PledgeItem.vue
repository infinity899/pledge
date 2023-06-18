<template>
<div class="pledge-item" :class="{ donation: item.type === 'DONATION', changeable }">
  <div class="item-info">
    <div v-if="item.type === 'STANDARD'" class="item-image" />
    <h4 class="item-name subtitle">
      {{ item.reward.title || "Backer Donation" }}
    </h4>
  </div>
  <div class="item-detail">
    <div v-if="(item.type === 'STANDARD') && changeable" class="item-quantity">
      <div v-if="changeable" class="item-quantity-edit">
        <h4>{{ item.quantity }}</h4>
        <UpDown
          :disabledDown="item.quantity <= 1"
          @up="addItem()"
          @down="subtractItem()"
        />
      </div>
    </div>
    <div v-if="item.type === 'STANDARD'" class="item-variant">
      <!-- TODO: Use real variant data when ready -->
      <TitledSelect
        v-if="changeable"
        class="dropdown"
        :placeholder="''"
        :value="selectedVariant"
        :options="variants"
        :label="'name'"
      />
      <h4 v-else>
        {{ item.variant || 'White' }}
      </h4>
    </div>
    <div class="item-cost">
      <h4>{{ item.usd_price | from_cents }}</h4>
    </div>
  </div>
  <span
    v-if="changeable"
    class="btn-remove"
    @click="onRemoveAll()"
  >
    <Cross />
  </span>
</div>
</template>

<script>
import * as api from '@/utils/api';
import UpDown from '@/components/svg/UpDown.vue';
import Cross from '@/components/svg/Cross.vue';
import TitledSelect from '@/components/widget/TitledSelect.vue';

export default {
  name: 'PledgeItem',
  components: {
    Cross,
    UpDown,
    TitledSelect,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    changeable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    variants() {
      return this.item.reward.variants || [];
    },
    selectedVariant() {
      return this.variants[0] || {};
    },
  },
  methods: {
    subtractItem() {
      this.updateItemQuantity(this.item.quantity - 1);
    },
    addItem() {
      this.updateItemQuantity(this.item.quantity + 1);
    },
    updateItemQuantity(newQuantity) {
      const quantity = Math.max(0, newQuantity);
      const projectId = this.$route.params.id;
      const rewardId = this.item.reward.id;

      // TODO: add debounce (ie, don't call backend api until
      // 400ms has passed since last click)?

      // TODO -- handle errors
      api.setPledgeItem({ projectId, rewardId, quantity })
        .then((pledge) => {
          if(pledge) {
            this.$emit('update:pledge', pledge);
          }
        });
    },
    onRemoveAll() {
      this.updateItemQuantity(0);
    },
  },
};
</script>

<style lang="scss">

.pledge-item {
  width: 100%;
  display: flex;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .item-info {
    display: flex;
    flex: 1;
    align-items: center;
    margin-right: 30px;
  }
  .item-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
  }
  .item-image {
    width: 72px;
    height: 72px;
    background: #ddd;
    margin-right: 16px;
  }
  .item-name {
    width: 180px;
  }
  .item-quantity {
    .item-quantity-edit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid $border-light;
      h4 {
        width: 40px;
        text-align: center;
      }
      .p-up-down {
        border-left: 1px solid $border-light;
        > svg {
          margin: 6px 2px;
        }
      }
    }
  }
  .item-variant {
    .dropdown .multiselect__tags {
      height: 48px;
      width: 100px;
      border: 1px solid $border-light;
      border-radius: 0;
    }
  }
  .item-cost {
    width: 40px;
    text-align: right;
  }
  .btn-remove {
    cursor: pointer;
    margin-left: 30px;
  }
  &.donation {
    .item-cost {
      margin-left: auto;
    }
    .btn-remove {
      top: 15px;
    }
  }
  @media (max-width: $mobile-width) {
    &.changeable {
      flex-direction: column;
    }
    .item-info, .item-detail {
      margin: 0;
      width: 100%;
    }
    .item-info {
      .item-image {
        display: none;
      }
    }
    .btn-remove {
      position: absolute;
      top: 20px;
      right: 0;
    }
  }
}
</style>
