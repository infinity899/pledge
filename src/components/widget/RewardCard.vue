<template>
<div class="p-reward-card" :class="status">
  <div class="reward-image" :style="{ backgroundImage: `url(${imageUrl})`}" />
  <div v-if="status === RewardStatus.DONATION" class="reward-content">
    <div class="reward-content-text">
      <h3 class="title">
        {{ $t('reward.pledge') }}
      </h3>
      <hr>
      <div class="p_small description">
        {{ $t('reward.description') }}
      </div>
    </div>
    <div class="reward-pledging">
      <TitledInput
        v-model="donationAmount"
        :hasIcon="true"
        :isDisabled="edit"
      />
    </div>
  </div>
  <div v-else class="reward-content">
    <div class="reward-content-text">
      <div class="h4 title">
        <span>{{ reward.title }}</span>
        <div class="reward-price">
          {{ rewardPrice }}
        </div>
      </div>
      <div class="p_small description">
        {{ reward.description }}
      </div>
    </div>
    <div v-if="edit || (!edit && projectActive)" class="reward-variants">
      <TitledSelect
        v-if="reward.variants.length > 1"
        :value="selectedVariant"
        :options="reward.variants"
        :label="'name'"
        placeholder=""
        @input="onSelectVariant"
      />
    </div>
  </div>
  <div v-if="showBackers" class="limitation">
    {{ $t('reward.backers', ['0', reward.backer_limit]) }}
  </div>
  <button
    v-if="edit"
    class="reward-action-edit"
    :disabled="status === RewardStatus.DONATION"
    @click="onClickButton"
  >
    {{ buttonText }}
  </button>
  <div v-else-if="!edit && projectActive" class="reward-action">
    <button
      :class="`btn-reward-action btn-reward-action-${status} ${(isAdded || donationAdded) ? 'added' : ''}`"
      :disabled="status === RewardStatus.SOLD"
      @click="onClickButton"
    >
      <span>{{ buttonText }}</span>
      <svg
        v-if="status === RewardStatus.ADD"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M6.75 0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75V0Z"
          fill="#ffffff"
        />
      </svg>
    </button>
  </div>
  <AccountRequiredModal
    v-if="showAccountRequired"
    @closeModal="showAccountRequired = false"
  />
</div>
</template>

<script>
import TitledInput from '@/components/widget/TitledInput.vue';
import TitledSelect from '@/components/widget/TitledSelect.vue';
import AccountRequiredModal from '@/components/widget/AccountRequiredModal.vue';
import rewardDefaultImage from '@/static/img/login_left2.jpg'; // TODO: Need to show a placeholder image or empty background?

import { RewardStatus, RewardEvent } from '@/utils/constants.js';

export default {
  name: 'reward-card',
  components: {
    TitledInput,
    TitledSelect,
    AccountRequiredModal,
  },
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    projectActive: {
      type: Boolean,
      default: false,
    },
    reward: {
      type: Object, // Not required in donation mode
      default: null,
    },
    status: {
      type: String,
      default: RewardStatus.ADD,
      validator(value) {
        return Object.values(RewardStatus).indexOf(value) !== -1;
      },
    },
    edit: Boolean,
  },
  data() {
    return {
      RewardStatus,
      selectedVariantId: null,
      donationAmount: 1,
      isAdded: false,
      donationAdded: false,
      showAccountRequired: false,
    };
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
    selectedVariant() {
      if(!this.reward) {
        return null;
      }
      const { variants } = this.reward;
      return variants.find(v => v.id === this.selectedVariantId) || variants[0];
    },
    imageUrl() {
      const { selectedVariant } = this;
      return (selectedVariant && selectedVariant.image.url) ? selectedVariant.image.url : rewardDefaultImage;
    },
    rewardPrice() {
      const variantPrice = this.selectedVariant.price_usd;
      return `$${(variantPrice / 100).toLocaleString()}`;
    },
    buttonText() {
      if(this.edit) {
        return this.$t('reward.buttons.edit');
      }
      if(this.isAdded) {
        return this.$t('reward.buttons.added');
      }
      if(this.donationAdded) {
        return this.$t('reward.buttons.donation_added');
      }
      return this.$t('reward.buttons')[this.status];
    },
    showBackers() {
      return this.reward && (this.reward.backer_limit > 0) && this.projectActive;
    },
  },
  methods: {
    onClickButton() {
      if(!this.authenticated) {
        this.showAccountRequired = true;
        return;
      }
      const {
        projectId,
        reward,
        status,
        donationAmount,
        selectedVariant,
      } = this;
      if(status === RewardStatus.DONATION) {
        this.$emit('rewardEvent', {
          eventType: RewardEvent.DONATE,
          projectId,
          amount: donationAmount * 100,
        });
        this.donationAdded = true;
        setTimeout(this.resetStatus, 1800);
      } else if(status === RewardStatus.ADD) {
        this.$emit('rewardEvent', {
          eventType: RewardEvent.ADD,
          projectId,
          reward,
          variantId: selectedVariant.id,
        });
        this.isAdded = true;
        setTimeout(this.resetStatus, 1800);
      }
    },
    resetStatus() {
      this.isAdded = false;
      this.donationAdded = false;
    },
    onSelectVariant(variant) {
      this.selectedVariantId = variant.id;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-reward-card {
  display: flex;
  flex-direction: column;
  width: 297px;
  min-height: 465px;
  border: 1px solid rgba(216, 216, 216, 0.5);
  .reward-image {
    height: 194px;
    background-color: #d8d8d8;
    background-position: center;
    background-size: cover;
  }
  .reward-content {
    padding: 20px 16px 4px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .reward-content-text {
      height: 120px;
      overflow: hidden;
    }
    .title {
      display: flex;
      justify-content: space-between;
      .reward-price {
        display: inline-block;
        margin-left: 5px;
      }
    }
    .description {
      color: $black-med;
    }
    .reward-variants {
      margin-top: auto;
      position: relative;
      .p-select-wrap {
        margin: 0;
      }
    }
  }
  .limitation {
    @include p_info;
    color: $black-light50;
    padding: 12px 18px 9px;
  }
  .reward-action-edit {
    @include button($white, large);
    color: $main-blue;
    @include button_small_text;
    text-align: center;
    border-top: 1px solid $border-light;
    &:disabled {
      color: $main-blue;
      opacity: 0.2;
      background-color: $white;
    }
    &:hover:enabled {
      box-shadow: none;
    }
  }
  .reward-action {
    .btn-reward-action-add,
    .btn-reward-action-donation {
      @include button($main-blue, large);
      transition: background-color 0.3s ease-in-out;
      svg {
        width: 12px;
        height: 12px;
        transition: opacity 0.3s ease-in-out;
        position: absolute;
        right: 24px;
      }
      &:focus:enabled {
        background-color: $main-blue;
      }
      &.added,
      &.added:hover:enabled,
      &.added:focus:enabled {
        background-color: $orange-med;
        transition: none;
        svg {
          opacity: 0;
          transition: none;
        }
      }
    }
    .btn-reward-action-sold {
      @include button($grey, large);
    }
    .btn-reward-action {
      width: 100%;
      text-align: left;
      justify-content: flex-start;
      padding-left: 32px;
      position: relative;
      &:hover:enabled {
        box-shadow: none;
      }
    }
  }
  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
  &.donation {
    .reward-image {
      display: none;
    }
    .reward-content {
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .reward-pledging {
        @include h4;
        margin-bottom: 18px;
        .p-input-wrap {
          margin: 0;
        }
      }
    }
    hr {
      margin: 15px 0 25px;
    }
  }
}
</style>
