<template>
<div class="login login-modal-form-wrap">
  <form class="login-form login-modal-form" @submit="handleSubmit">
    <div class="login-form-title">
      {{ $t('auth.what') }}
    </div>
    <div class="login-subtitle">
      {{ $tc('auth.later', missingFieldsCount) }}
    </div>
    <TitledInput
      v-if="missingName"
      v-model="name"
      name="name"
      class="form-input"
      :placeholder="$t('auth.placeholders.name')"
      :maxLength="40"
    />
    <TitledInput
      v-if="missingEmail"
      v-model="email"
      name="email"
      class="form-input"
      type="email"
      :placeholder="$t('auth.placeholders.email')"
      :errorMessage="errorEmail"
      @input="clearErrors"
    />
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <button
      type="submit"
      class="save-modal-button"
      :disabled="errorEmail"
    >
      <div>{{ $t('auth.buttonText.save') }}</div>
    </button>
  </form>
</div>
</template>

<script>
import TitledInput from '@/components/widget/TitledInput.vue';
import { validateEmail } from '@/utils/stringUtils';
import { AUTH_REQUEST, USER_UPDATE } from '@/store/actions';

export default {
  name: 'incomplete',
  components: {
    TitledInput,
  },
  props: {
    credentials: {
      type: Object,
      default: null,
    },
    redirectUser: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      email: '',
      name: '',
      errorEmail: null,
      errorMessage: null,
      missingName: false,
      missingEmail: false,
    };
  },
  computed: {
    missingFieldsCount() {
      let count = 0;
      if(this.missingName) {
        count += 1;
      }
      if(this.missingEmail) {
        count += 1;
      }
      return count;
    },
  },
  methods: {
    clearErrors() {
      this.errorMessage = null;
      this.errorEmail = null;
    },
    async handleSubmit(e) {
      e.preventDefault();
      const { name, email } = this;
      this.clearErrors();
      if(!email || email === '') {
        this.errorEmail = this.$t('auth.errors.EMAIL_MISSING');
      } else if(!validateEmail(email)) {
        this.errorEmail = this.$t('auth.errors.EMAIL_INVALID');
      }
      try {
        const { credentials } = this;
        await this.$store.dispatch(USER_UPDATE, { name });
        await this.$store.dispatch(AUTH_REQUEST, credentials);
      } catch(err) {
        console.log('updateProfile error: ', err);
      }
      this.redirectUser();
    },
  },
  mounted() {
    this.missingName = this.$store.getters.errors.includes('missing_user_name');
    this.missingEmail = this.$store.getters.errors.includes('missing_user_email');
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.save-modal-button {
  @include button($main-blue, full);
  margin-top: 50px;
}
</style>
