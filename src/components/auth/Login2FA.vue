<template>
<div class="login-modal-form-wrap login-2fa">
  <form class="login-modal-form login-2fa-form" @submit="handleSubmit">
    <div class="login-form-title">
      {{ $t('auth.two_factor_auth') }}
    </div>
    <div class="login-subtitle">
      {{ $t('auth.unable_provide_code') }}<a>{{ $t('auth.click_here') }}</a>
    </div>
    <h4>{{ $t('auth.enter_digits') }}</h4>
    <p>{{ $t('auth.enter_verification_code') }}</p>
    <TitledInput
      v-model="code"
      class="code-input"
      placeholder="000000"
      mask="######"
      :errorMessage="error.code"
    />
    <Checkbox
      :item="{ checked: dontAsk, label: $t('auth.dont_ask_30_days') }"
      :onCheck="handleCheck"
    />
    <div v-if="error.message" class="error-message">
      {{ error.message }}
    </div>
    <button type="submit" class="login-modal-button">
      <span>{{ $t('auth.buttonText.verify') }}</span>
      <Arrow :color="'white'" />
    </button>
  </form>
</div>
</template>

<script>
import TitledInput from '@/components/widget/TitledInput.vue';
import Checkbox from '@/components/widget/Checkbox.vue';
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'login-2fa',
  components: {
    TitledInput,
    Checkbox,
    Arrow,
  },
  data() {
    return {
      code: '',
      error: {},
      dontAsk: false,
    };
  },
  methods: {
    handleCheck() {
      this.dontAsk = !this.dontAsk;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.error = {};
      if(this.code.length < 6) {
        this.error.code = this.$t('auth.errors.CODE_INVALID');
        return;
      }
      // TODO: Integrate 2fa code api
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.login-modal-form-wrap.login-2fa {
  .login-2fa-form {
    .login-form-title {
      max-width: unset;
    }
    .login-subtitle a {
      margin-left: 8px;
    }
    p {
      color: $black-med;
      margin: 16px 0 8px;
    }
    .p-checkbox-wrap {
      margin-bottom: 28px;
      .p-checkbox {
        font-family: $font-title;
        font-size: 12px;
        line-height: 20px;
        font-weight: 600;
        color: rgba($main-black, 0.3);
      }
    }
    .code-input input {
      letter-spacing: 3px;
    }
  }
}
</style>
