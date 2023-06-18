<template>
<div class="login login-modal-form-wrap">
  <form class="login-form login-modal-form">
    <div class="login-form-title">
      {{ $t('auth.confirm') }}
    </div>
    <div class="login-subtitle">
      {{ $t('auth.check_inbox') }}
      <a
        :class="{ 'confirmed': confirmed }"
        @click="handleResend()"
      >
        {{ $t('auth.click_here') }}
      </a>
      {{ $t('auth.check_inbox2') }}
    </div>
  </form>
</div>
</template>

<script>
import { resendConfirmation } from '@/utils/api.js';

export default {
  name: 'confirm-email',
  props: {
    credentials: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      confirmed: false,
    };
  },
  methods: {
    async handleResend() {
      try {
        const { username: email } = this.credentials;
        await resendConfirmation(email);
        this.confirmed = true;
      } catch(e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import "widgets.scss";

.login-subtitle > a {
  @include link;
  &.confirmed {
    display: inline-flex;
    align-items: center;
    &::after {
      content: "";
      background: url('../../static/img/icons/ic_check.png');
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      margin-left: 4px;
      display: block;
    }
  }
}
</style>

