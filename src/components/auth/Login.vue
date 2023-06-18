<template>
<div class="login login-modal-form-wrap">
  <form class="login-form login-modal-form" @submit="handleSubmit">
    <div class="login-form-title">
      {{ $t('auth.login') }}
    </div>
    <div class="login-subtitle">
      {{ $t('auth.dont_have_account') }}
      <span class="signup-toggle" @click="gotoSignup">{{ $t('auth.create_one') }}</span>
    </div>
    <div class="social-btn facebook" @click="handleSocialLogin('Facebook')">
      <div class="btn-text">
        {{ $t('auth.buttonText.facebook') }}
      </div>
      <img class="social-icon" :src="require('@/static/img/icons/ic_facebook.png')">
    </div>
    <div class="social-btn google" @click="handleSocialLogin('Google')">
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
      :placeholder="$t('auth.placeholders.email')"
      :errorMessage="errorEmail"
      @input="clearErrors"
    />
    <TitledInput
      v-model="password"
      name="password"
      class="form-input"
      type="password"
      :placeholder="$t('auth.placeholders.password')"
      :errorMessage="errorPassword"
      @input="clearErrors"
    />
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <button
      type="submit"
      class="login-modal-button"
      :disabled="disabledLoginButton"
    >
      <div>{{ $t('login') }}</div>
      <Arrow :color="'white'" />
    </button>
    <div class="remember-forgot">
      <div class="remember-me">
        <Checkbox :item="{ checked: true }" />
        <span>{{ $t('auth.remember_me') }}</span><!-- TODO: enable -->
      </div>
      <div class="forgot-password">
        <router-link :to="{ path: '/forgot-password' }">
          {{ $t('auth.forgot_password') }}
        </router-link>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import TitledInput from '@/components/widget/TitledInput.vue';
import Checkbox from '@/components/widget/Checkbox.vue';
import Arrow from '@/components/svg/Arrow.vue';
import { validateEmail } from '@/utils/stringUtils';
import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
} from '@/store/actions';
import {
  socialLogin,
  requestSocialAuth,
  USER_TOKEN_KEY,
} from '@/utils/api';

export default {
  name: 'login',
  components: {
    TitledInput,
    Checkbox,
    Arrow,
  },
  props: {
    isRoute: Boolean,
    redirectUser: {
      type: Function,
      default: () => {},
    },
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
      socialError: null,
    };
  },
  computed: {
    disabledLoginButton() {
      return (this.errorMessage && this.errorMessage !== this.$t('auth.errors.NETWORK_FAILURE')) || this.errorEmail || this.errorConfirm || this.errorPassword;
    },
  },
  methods: {
    gotoSignup() {
      this.email = '';
      this.password = '';
      this.clearErrors();
      this.$emit('gotoSignup');
    },
    clearErrors() {
      this.errorMessage = null;
      this.errorEmail = null;
      this.errorPassword = null;
      this.errorConfirm = null;
    },
    async handleSubmit(e) {
      e.preventDefault();
      const { email, password } = this;
      this.clearErrors();
      if(!email || email === '') {
        this.errorEmail = this.$t('auth.errors.EMAIL_MISSING');
      } else if(!validateEmail(email)) {
        this.errorEmail = this.$t('auth.errors.EMAIL_INVALID');
      } else if(!password) {
        this.errorPassword = this.$t('auth.errors.PASSWORD_MISSING');
      } else {
        const credentials = {
          username: email,
          password,
        };
        try {
          await this.loginUser(credentials);
        } catch(err) {
          this.errorMessage = err;
        }
      }
    },
    async handleSocialLogin(type) {
      this.socialError = null;

      try {
        const resp = await socialLogin(type);
        const { token } = resp.data;
        this.handleSocialAuthSuccess(token);
      } catch(e1) {
        try {
          localStorage.removeItem(USER_TOKEN_KEY);

          // If social login fails, assume it's because they're not logged in to social account.
          // Social auth window will prompt to login to social account.

          const resp = await requestSocialAuth(type);
          const { redirect_url: redirectURL } = resp.data;
          window.location = redirectURL;
        } catch(e2) {
          this.$store.commit(AUTH_FAILURE, e2);
          this.socialError = `${type} authorization failed.`;
        }
      }
    },
    handleSocialAuthSuccess(token) {
      localStorage.setItem(USER_TOKEN_KEY, token);
      this.$store.commit(AUTH_SUCCESS, token);
      this.socialError = null;
      this.redirectUser();
    },
  },
};
</script>
