<template>
<AuthLayout
  :isRoute="isRoute"
  @closeModal="handleClose"
>
  <template v-slot:content>
    <Login
      v-if="isLogin && !incompleteStatus"
      :loginUser="loginUser"
      :redirectUser="redirectUser"
      @gotoSignup="toggleAuthView('signup')"
      @closeModal="handleClose"
    />
    <Signup
      v-if="!isLogin && !incompleteStatus"
      :loginUser="loginUser"
      :isRoute="isRoute"
      @closeModal="handleClose"
      @gotoLogin="toggleAuthView('login')"
    />
    <CompleteInfo
      v-if="incompleteStatus === 'missing_user_name'"
      :redirectUser="redirectUser"
      :credentials="credentials"
      @closeModal="handleClose"
    />
    <ConfirmEmail
      v-if="incompleteStatus === 'email_not_confirmed'"
      :credentials="credentials"
      @closeModal="handleClose"
    />
    <Login2FA
      v-if="incompleteStatus === 'totp_not_confirmed'"
      :credentials="credentials"
      @closeModal="handleClose"
    />
  </template>
</AuthLayout>
</template>

<script>
import Signup from '@/components/auth/Signup.vue';
import Login from '@/components/auth/Login.vue';
import Login2FA from '@/components/auth/Login2FA.vue';
import CompleteInfo from '@/components/auth/CompleteInfo.vue';
import ConfirmEmail from '@/components/auth/ConfirmEmail.vue';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import { AUTH_REQUEST } from '@/store/actions';

export default {
  name: 'login_modal',
  components: {
    Signup,
    Login,
    Login2FA,
    CompleteInfo,
    ConfirmEmail,
    AuthLayout,
  },
  props: {
    isSignup: Boolean,
  },
  data() {
    return {
      isLogin: true,
      credentials: null,
    };
  },
  computed: {
    isRoute() {
      return (this.$route.name === 'login' || this.$route.name === 'signup');
    },
    incompleteStatus() {
      // TODO: Remove following comment line after totp api integration
      // return this.$store.getters.authStatus === 'incomplete' ? 'totp_not_confirmed' : null;
      return this.$store.getters.authStatus === 'incomplete' ? this.$store.getters.errors[0] : null;
    },
  },
  methods: {
    handleClose() {
      this.$emit('closeModal');
      document.body.classList.remove('noscroll');
    },
    toggleAuthView(routeName) {
      if(this.isRoute) {
        this.$router.push({ name: routeName });
      }
      this.isLogin = !this.isLogin;
    },
    async loginUser(credentials) {
      this.credentials = credentials;
      await this.$store.dispatch(AUTH_REQUEST, credentials);
      this.redirectUser();
    },
    redirectUser() {
      if(this.incompleteStatus) {
        return;
      }
      if(this.isRoute) {
        const { query } = this.$route;
        if(query.from) {
          const path = query.from;
          this.$router.push({ path });
        } else {
          this.$router.push({ name: 'user' });
        }
      } else {
        this.handleClose();
      }
    },
  },
  mounted() {
    if(this.isRoute) {
      // If the user is already logged in, reroute to profile
      if(this.$store.getters.isAuthenticated) {
        this.$router.push({ name: 'user' });
      } else {
        const { name } = this.$route;
        this.isLogin = name === 'login';
      }
    } else {
      this.isLogin = this.isSignup;
      document.body.classList.add('noscroll');
    }
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.modal-login-outer, .auth-wrap {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.modal-login-outer {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  transition: opacity 0.3s ease;
  z-index: 2000;
  overflow-y: auto;
}
.modal-login-inner {
  margin: 0 auto;
  padding: 20px 30px 0;
  background-color: $white;
  transition: all 0.3s ease;
  &.auth-inner {
    transition: unset;
    padding-top: 40px;
  }
  .modal-login-main {
    position: relative;
    margin: 0 auto;

    .images {
      position: relative;
      margin-top: 100px;
      .images-left {
        float: left;
      }
      .images-right {
        float: right;
      }
    }
  }
  @media (max-width: $tablet-width-large) {
    min-height: 750px;
    .modal-login-main {
      .images {
        margin-top: 110px;
        .images-left {
          margin-left: -28px;
        }
        .images-right {
          margin-right: -28px;
        }
      }
    }
  }
  @media (max-width: $tablet-width) {
    padding: 20px 20px 0;
    .modal-login-main {
      .images {
        display: none;
      }
    }
  }
}

.image-item {
  position: relative;
  &.socks {
    height: 100px;
    bottom: 200px;
    left: -75px;
  }
  &.gin {
    height: 180px;
  }
  &.singer {
    height: 130px;
    left: -35px;
  }
  &.phone {
    height: 180px;
    right: -76px;
  }
  &.gadget {
    height: 100px;
    bottom: 200px;
  }
  &.bottles {
    height: 110px;
    right: -35px;
  }
  @media (max-width: $tablet-width-large) {
    &.socks {
      left: -115px;
    }
    &.gadget {
      right: 30px;
    }
  }
}

.modal-login-header {
  width: 100%;
  height: 60px;
  margin: 0 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.login-modal-close {
  @include subtitle;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  & > div {
    padding-top: 2px;
  }
  .close-img {
    margin-left: 10px;
    width: 16px;
    height: 16px;
  }
}

.login-modal-form-wrap {
  width: 100%;
  height: 465px;
  background-image: none;
  position: relative;

  .login-modal-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
    > * {
      max-width: 412px;
      width: 100%;
    }

    .form-input {
      margin-bottom: 8px;
    }
    .login-form-title {
      @include h1;
      text-align: center;
      max-width: 512px;
    }
    .info-title {
      margin-top: 30px;
      padding: 0 30px;
    }
    .login-subtitle {
      @include button_large_text;
      margin: 12px 0 40px;
      text-align: center;
    }
    .signup-or-wrap {
      display: flex;
      align-items: center;
      margin: 24px 0 12px;
      .signup-or {
        padding: 0 8px;
        @include h4;
      }
      .signup-or-border {
        height: 1px;
        background-color: $border-light;
        flex-grow: 2;
        margin-bottom: 3px;
      }
    }
    .error-message {
      @include error;
      padding-left: 16px;
    }
    .login-modal-button {
      @include button($main-black, full);
      justify-content: space-between;
      padding: 7px 12px;
      margin: 20px 0;
      &.signup-invalid {
        background-color: $grey-light;
      }
    }
    .save-button {
      justify-content: center;
      background-color: $main-blue;
    }
    .social-btn {
      @include button_large_text;
      height: 48px;
      margin-bottom: 15px;
      cursor: pointer;
      color: $white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .social-icon {
        width: 25px;
      }
      .btn-text {
        padding-top: 4px;
      }
    }
    .google {
      background-color: #4c8bf5;
    }
    .facebook {
      background-color: #3b5998;
    }
    .remember-forgot {
      @include p_info;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .remember-me > span {
        margin-left: 20px;
        line-height: 22px;
      }
    }
    .eyeball {
      position: relative;
      .pic {
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 10px;
        margin-top: -36px;
        height: 12px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: $tablet-width) {
    .login-modal-form {
      .login-form-title {
        @include h2;
      }
      .login-subtitle {
        @include button_small_text;
        margin: 5px 0 24px;
      }
    }
  }
}
.signup-invalid {
  border: 1px solid red;
}
.signup-toggle {
  cursor: pointer;
  color: $main-blue;
}
</style>
