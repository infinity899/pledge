<template>
<AuthLayout :showClose="false">
  <template v-slot:content>
    <div class="login login-modal-form-wrap forgot-password-contain">
      <form class="login-form login-modal-form" @submit="handleSubmit">
        <div class="login-form-title">
          {{ $t('auth.reset_password') }}
        </div>
        <div class="forgot-password-subtitle">
          {{ $t('auth.enter_password') }}
        </div>
        <TitledInput
          v-model="password"
          name="new-password"
          class="form-input"
          type="password"
          :placeholder="$t('auth.placeholders.new_password')"
          :showError="password.length >= 1 && !passwordValid"
          :errorMessage="errorPassword"
          :maxLength="40"
          @input="clearErrors"
        />
        <TitledInput
          v-model="confirmPassword"
          name="confirm-password"
          class="form-input"
          type="password"
          :placeholder="$t('auth.placeholders.confirm_password')"
          :errorMessage="errorConfirm"
          :maxLength="40"
          @input="clearErrors"
        />
        <PasswordValidate
          v-if="password.length > 0"
          :password="password"
          @passwordValidation="getPasswordStatus"
        />
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="login-modal-button"
          :disabled="errorMessage || errorPassword || errorConfirm"
        >
          <div>{{ $t('confirm') }}</div>
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
import PasswordValidate from '@/components/widget/PasswordValidate.vue';

export default {
  name: 'reset-password',
  components: {
    AuthLayout,
    TitledInput,
    Arrow,
    PasswordValidate,
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      errorMessage: null,
      errorPassword: null,
      errorConfirm: null,
      passwordValid: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.clearErrors();
      const { password, confirmPassword } = this;
      if(!password || password === '') {
        this.errorPassword = this.$t('auth.errors.PASSWORD_MISSING');
      } else if(!confirmPassword || confirmPassword === '') {
        this.errorConfirm = this.$t('auth.errors.PASSWORD_CONFIRM');
      } else if(password !== confirmPassword) {
        this.errorMessage = this.$t('auth.errors.PASSWORD_MISMATCH');
      } else {
        // TODO API implementation
        // TODO where do we navigate on success?
      }
    },
    clearErrors() {
      this.errorPassword = null;
      this.errorConfirm = null;
      this.errorMessage = null;
    },
    getPasswordStatus(status) {
      this.passwordValid = status;
    },
  },
};

</script>
