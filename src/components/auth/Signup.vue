<template>
<div class="login login-modal-form-wrap">
  <form class="login-form login-modal-form" @submit="handleSubmit">
    <div class="login-form-title">
      {{ $t('auth.signup') }}
    </div>
    <div class="login-subtitle">
      {{ $t('auth.already_have_account') }}
      <span class="signup-toggle" @click="gotoLogin">{{ $t('auth.login_here') }}</span>
    </div>
    <div class="social-btn facebook" @click="handleSocialSignup('Facebook')">
      <div class="btn-text">
        {{ $t('auth.buttonText.facebook') }}
      </div>
      <img class="social-icon" :src="require('@/static/img/icons/ic_facebook.png')">
    </div>
    <div class="social-btn google" @click="handleSocialSignup('Google')">
      <div class="btn-text">
        {{ $t('auth.buttonText.google') }}
      </div>
      <img class="social-icon" :src="require('@/static/img/icons/ic_google.png')">
    </div>
    <div v-if="socialError" class="error-message">
      {{ socialError }}
    </div>
    <div class="signup-or-wrap">
      <div class="signup-or-border" />
      <div class="signup-or">
        {{ $t('auth.or') }}
      </div>
      <div class="signup-or-border" />
    </div>
    <TitledInput
      v-model="email"
      name="email"
      class="form-input"
      type="email"
      :errorMessage="errorEmail"
      :placeholder="$t('auth.placeholders.email')"
      @input="clearErrors"
    />
    <TitledInput
      v-model="password"
      name="password"
      class="form-input"
      :inputClass="(!passwordValid && password.length) ? 'invalid' : ''"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="$t('auth.placeholders.create_password')"
      :errorMessage="errorPassword"
      :showError="password.length >= 1 && !passwordValid"
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
      class="form-control login-modal-button"
      :class="(!passwordValid && password.length) ? 'invalid' : ''"
      :disabled="errorMessage || errorEmail || errorPassword || errorConfirm || !passwordValid"
    >
      <div>{{ $t('signup') }}</div>
      <Arrow :color="'white'" />
    </button>
    <div class="disclaimer">
      {{ $t('auth.disclaimer') }}<span>{{ $t('auth.read') }}</span>
    </div>
  </form>
</div>
</template>

<script>
import TitledInput from '@/components/widget/TitledInput.vue';
import PasswordValidate from '@/components/widget/PasswordValidate.vue';
import Arrow from '@/components/svg/Arrow.vue';
import { validateEmail } from '@/utils/stringUtils';
import {
  userRegister,
  requestSocialAuth,
} from '@/utils/api';

export default {
  name: 'signup',
  components: {
    TitledInput,
    Arrow,
    PasswordValidate,
  },
  props: {
    isRoute: Boolean,
    loginUser: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      errorEmail: null,
      errorPassword: null,
      errorConfirm: null,
      showPassword: false,
      socialError: null,
      passwordValid: false,
    };
  },
  methods: {
    getPasswordStatus(status) {
      this.passwordValid = status;
    },
    gotoLogin() {
      this.email = '';
      this.password = '';
      this.clearErrors();
      this.$emit('gotoLogin');
    },
    clearErrors() {
      this.errorMessage = null;
      this.errorEmail = null;
      this.errorPassword = null;
      this.errorConfirm = null;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.socialError = null;
      const { email, password } = this;
      this.clearErrors();
      if(!email || email === '') {
        this.errorEmail = this.$t('auth.errors.EMAIL_MISSING');
      } else if(!validateEmail(email)) {
        this.errorEmail = this.$t('auth.errors.EMAIL_INVALID');
      } else if(!password || password === '') {
        this.errorPassword = this.$t('auth.errors.PASSWORD_MISSING');
      } else {
        this.clearErrors();
        this.socialError = null;
        const user = { email, password };
        if(this.password.length && this.passwordValid) {
          try {
            await userRegister(user);
            const credentials = {
              username: email,
              password,
            };

            await this.loginUser(credentials);
          } catch(err) {
            if(err) {
              this.errorMessage = err.message;
            } else {
              this.errorMessage = this.$t('auth.errors.REGISTRATION_FAILURE');
            }
          }
        }
      }
    },
    async handleSocialSignup(type) {
      this.clearErrors();
      this.socialError = null;
      try {
        const resp = await requestSocialAuth(type);
        const { redirect_url: redirectURL } = resp.data;
        window.location = redirectURL;
      } catch(err) {
        this.socialError = `${type} signup currently unavailable.`;
      }
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.disclaimer {
  @include p_info;
  text-align: center;
  & > span {
    padding-left: 8px;
    font-weight: 700;
    cursor: pointer;
  }
}

</style>
