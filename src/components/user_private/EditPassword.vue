<template>
<div class="edit-password">
  <form class="edit-password-form" @submit="handleSubmit">
    <TitledInput
      v-model="password"
      name="password"
      class="form-input"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="$t('settings.account.placeholders.current_password')"
      :errorMessage="errorPassword"
      @input="clearErrors"
    />
    <TitledInput
      v-model="newPassword"
      name="new-password"
      class="form-input"
      :type="showNewPassword ? 'text' : 'password'"
      :placeholder="$t('settings.account.placeholders.new_password')"
      :errorMessage="errorNewPassword"
      :showError="newPassword.length >= 1 && !passwordValid"
      @input="clearErrors"
    />
    <PasswordValidate
      v-if="newPassword.length > 0"
      :password="newPassword"
      @passwordValidation="getPasswordStatus"
    />
    <TitledInput
      v-model="confirmPassword"
      name="confirm-password"
      class="form-input"
      :type="showConfirmPassword ? 'text' : 'password'"
      :placeholder="$t('settings.account.placeholders.confirm_password')"
      :errorMessage="errorConfirm"
      @input="clearErrors"
    />
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div
      class="edit-password-cancel"
      @click="$emit('close')"
    >
      {{ $t('settings.account.password.cancel') }}
    </div>
    <button
      type="submit"
      class="edit-password-submit"
      :disabled="errorMessage || errorPassword || errorConfirm || errorNewPassword || (newPassword.length > 0 && !passwordValid)"
    >
      {{ $t('settings.account.password.update') }}
    </button>
  </form>
</div>
</template>

<script>
import TitledInput from '@/components/widget/TitledInput.vue';
import PasswordValidate from '@/components/widget/PasswordValidate.vue';
import { updatePassword } from '@/utils/api.js';

export default {
  name: 'edit-password',
  components: {
    TitledInput,
    PasswordValidate,
  },
  data() {
    return {
      newPassword: '',
      password: '',
      confirmPassword: '',
      errorMessage: null,
      errorNewPassword: null,
      errorPassword: null,
      errorConfirm: null,
      showPassword: false,
      showNewPassword: false,
      passwordValid: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    getPasswordStatus(status) {
      this.passwordValid = status;
    },
    clearErrors() {
      this.errorPassword = null;
      this.errorNewPassword = null;
      this.errorConfirm = null;
      this.errorMessage = null;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.clearErrors();
      const { password, newPassword, confirmPassword } = this;
      if(!password || password === '') {
        this.errorPassword = this.$t('auth.errors.PASSWORD_MISSING');
      } else if(!newPassword || newPassword === '') {
        this.errorNewPassword = this.$t('auth.errors.PASSWORD_MISSING');
      } else if(!confirmPassword || confirmPassword === '') {
        this.errorConfirm = this.$t('auth.errors.PASSWORD_CONFIRM');
      } else if(newPassword !== confirmPassword) {
        this.errorMessage = this.$t('auth.errors.PASSWORD_MISMATCH');
      } else {
        const passwords = { password, newPassword };
        try {
          await updatePassword(passwords);
          this.$emit('close');
        } catch(err) {
          this.errorPassword = err.response.data.userMessage;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.edit-password {
  .validate {
    @include p_info;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 15px;
    .validate-item {
      margin-right: 10px;
      height: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        height: 15px;
        width: 15px;
        margin-right: 4px;
      }
    }
    .check {
      padding-bottom: 2px;
      width: 12px;
      filter: invert(19%) sepia(96%) saturate(2869%) hue-rotate(234deg) brightness(91%) contrast(103%);
    }
    .close {
      padding-bottom: 1px;
      width: 10px;
      filter: invert(11%) sepia(99%) saturate(6577%) hue-rotate(2deg) brightness(99%) contrast(112%);
    }
  }
  .edit-password-cancel {
    @include button_small_text;
    cursor: pointer;
    color: $main-orange;
    display: inline-block;
    margin-right: 24px;
  }
  .edit-password-submit {
    @include button($main-black);
    margin-top: 40px;
  }
  .error-message {
    @include error;
  }
}
</style>
