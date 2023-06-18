<template>
<Modal
  class="kyc-modal"
  :cancelable="true"
  :submitable="false"
  :expanded="false"
  @cancel="$emit('close')"
>
  <template v-slot:content>
    <h3 class="kyc-modal-title">
      {{ $t('settings.verification.kyc_modal.title') }}
    </h3>
    <p class="kyc-modal-content p_small">
      {{ $t(`settings.verification.kyc_modal.content['${KYCMessages[messageType]}']`) }}
    </p>
    <div v-if="veriffEnable">
      <button class="submit-btn" @click="goToVeriff">
        {{ $t('settings.verification.kyc_modal.buttons.continue') }}
      </button>
      <div class="powered-by">
        {{ $t('settings.verification.kyc_modal.powered_by') }}
        <img class="veriff-icon" :src="require('@/static/img/veriff.png')">
      </div>
    </div>
    <div v-if="isRemoveConfiramtion">
      <button class="remove_confirm" @click="removeKYC">
        {{ $t('settings.verification.kyc_modal.buttons.confirm_remove') }}
      </button>
      <button class="remove_cancel" @click="$emit('close')">
        {{ $t('settings.verification.kyc_modal.buttons.confirm_cancel') }}
      </button>
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';
import { KYCMessages } from '@/utils/constants';

export default {
  name: 'kyc-modal',
  components: {
    Modal,
  },
  props: {
    messageType: {
      type: Number,
      default: 0,
    },
    kycUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      KYCMessages,
    };
  },
  computed: {
    veriffEnable() {
      return this.messageType === 0;
    },
    isRemoveConfiramtion() {
      return this.messageType === 3;
    },
  },
  methods: {
    goToVeriff() {
      console.log(this.kycUrl);
    },
    removeKYC() {
      console.log('removeKYC');
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.kyc-modal {
  text-align: center;

  .kyc-modal-content {
    padding: 24px 0;
  }

  .submit-btn {
    @include button($main-black, full, primary);
    margin: 24px 0;
  }

  .remove_confirm {
    @include button($main-red, small, primary);
    margin-right: 50px;
  }

  .remove_cancel {
    @include button($main-black, small, secondary);
    background-color: $white;
    text-transform: uppercase;
  }

  .powered-by {
    @include subtitle;

    color: $grey50;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;

    img { margin-left: 13px; }
  }
}
</style>
