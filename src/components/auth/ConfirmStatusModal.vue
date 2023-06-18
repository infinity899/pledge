<template>
<Modal
  :submitText="$t(`auth.emailConfirm.${status}.button`)"
  class="confirm-status-modal"
  @submit="emailConfirmedContinue"
  @cancel="$emit('closeModal')"
>
  <template v-slot:image>
    <div class="status-image">
      <!-- TODO: change image according to status -->
      <img :src="require('@/static/img/art_icons/congrats_large.png')">
    </div>
  </template>
  <template v-slot:content>
    <div class="status-message">
      <h1>{{ $t(`auth.emailConfirm.${status}.title`) }}</h1>
      <p v-if="status === statusTypes.SUCCESS" class="p_large">
        {{ $t(`auth.emailConfirm.${status}.message`) }}
      </p>
      <TitledInput
        v-if="showEmailInput"
        v-model="email"
        name="email"
        class="form-input"
        type="email"
        :placeholder="$t('auth.placeholders.email')"
        :errorMessage="errorEmail"
        @input="errorEmail = null"
      />
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import { EmailConfirmStatus } from '@/utils/constants';
import { validateEmail } from '@/utils/stringUtils';
import { resendConfirmation } from '@/utils/api.js';

export default {
  name: 'confirm-status-modal',
  components: {
    Modal,
    TitledInput,
  },
  props: {
    status: {
      type: String,
      validator(value) {
        return Object.values(EmailConfirmStatus).indexOf(value) >= 0;
      },
      default: EmailConfirmStatus.SUCCESS,
    },
  },
  data() {
    return {
      statusTypes: EmailConfirmStatus,
      showEmailInput: false,
      email: null,
      errorEmail: null,
    };
  },
  methods: {
    async emailConfirmedContinue() {
      if(this.status === this.statusTypes.NOT_FOUND || this.status === this.statusTypes.EXPIRED) {
        if(!this.email || this.email === '') {
          this.errorEmail = this.$t('auth.errors.EMAIL_MISSING');
        } else if(!validateEmail(this.email)) {
          this.errorEmail = this.$t('auth.errors.EMAIL_INVALID');
        } else {
          await resendConfirmation(this.email)
            .then(() => { this.email = null })
            .catch((err) => { this.errorEmail = err.response.data.userMessage });
        }
      }
      if(!this.errorEmail) {
        this.$emit('closeModal');
      }
    },
  },
  mounted() {
    this.showEmailInput = this.status !== this.statusTypes.SUCCESS;
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.confirm-status-modal {
  text-align: center;
  .submit-button {
    @include button($main-blue, large);
    max-width: 412px;
  }
  .status-image {
    margin-bottom: 24px;
    img {
      width: 190px;
    }
  }
  .status-message {
    margin-bottom: 24px;
  }
}
</style>
