<template>
<Modal
  :title="$t('account_required.title')"
  :expanded="false"
  :submitable="false"
  class="account-required-modal"
  @cancel="$emit('closeModal')"
>
  <template v-slot:content>
    <div class="account-required-content">
      {{ $t('account_required.text') }}
      <button @click="goto('login')">
        {{ $t('login') }}
      </button>
      <span>{{ $t('account_required.no_account') }}</span>
      <a @click="goto('signup')">
        {{ $t('account_required.click_to_signup') }}
      </a>
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';

export default {
  name: 'account-required-modal',
  components: { Modal },
  methods: {
    goto(page) {
      const returnPath = window.location.pathname;
      this.$router.push({ name: page, query: { from: returnPath } });
    },
  },
  destroyed() {
    document.body.classList.remove('noscroll');
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.account-required-modal.modal-outer .modal-inner {
  max-width: 420px;
  .account-required-content {
    @include p_small;
    box-sizing: border-box;

    font-weight: 400;

    a {
      text-decoration: underline;
      cursor: pointer;
    }

    button {
      @include button($main-black, full);
      margin: 32px 0 8px 0;
    }
  }
}
</style>
