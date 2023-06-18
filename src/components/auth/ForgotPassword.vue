<template>
<AuthLayout :showClose="false">
  <template v-slot:content>
    <div class="login login-modal-form-wrap forgot-password-contain">
      <form class="login-form login-modal-form" @submit="handleSubmit">
        <div class="login-form-title">
          {{ $t('auth.forgot_password') }}
        </div>
        <div class="forgot-password-subtitle">
          {{ $t('auth.enter_email') }}
        </div>
        <TitledInput
          v-model="email"
          name="email"
          class="form-input"
          :placeholder="$t('auth.placeholders.email')"
          :maxLength="40"
          @input="clearErrors"
        />
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="login-modal-button"
          :disabled="errorMessage"
        >
          <div>{{ $t('auth.buttonText.send') }}</div>
          <Arrow :color="'white'" />
        </button>
      </form>
    </div>
  </template>
</AuthLayout>
</template>

<script>
import AuthLayout from '@/components/auth/AuthLayout.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import Arrow from '@/components/svg/Arrow.vue';
import { validateEmail } from '@/utils/stringUtils';

export default {
  name: 'forgot-password',
  components: {
    AuthLayout,
    TitledInput,
    Arrow,
  },
  data() {
    return {
      errorMessage: null,
      email: '',
    };
  },
  methods: {
    clearErrors() {
      this.errorMessage = null;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.clearErrors();
      const { email } = this;
      if(!email || email === '') {
        this.errorMessage = this.$t('auth.errors.EMAIL_MISSING');
      } else if(!validateEmail(email)) {
        this.errorMessage = this.$t('auth.errors.EMAIL_INVALID');
      } else {
        // TODO API integration
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
.forgot-password-contain {
  .forgot-password-subtitle {
    @include p_large;
    text-align: center;
    margin: 18px 0 16px;
    max-width: none;
  }
}
</style>

