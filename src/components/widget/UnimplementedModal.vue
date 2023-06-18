<template>
<Modal
  title="Coming soon"
  submitText="Ok"
  :expanded="false"
  class="unimplemented-modal"
  @submit="$emit('closeModal')"
  @cancel="$emit('closeModal')"
>
  <template v-slot:content>
    <!-- eslint-disable vue-i18n/no-raw-text -->
    <div class="unimplemented-content">
      This feature is currently disabled. Check again soon!
      <span v-if="creator">If you're a creator interested in listing on Pledgecamp, please send an email to <a href="mailto:hello@pledgecamp.com">hello@pledgecamp.com</a></span>
    </div>
    <!-- eslint-enable vue-i18n/no-raw-text -->
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';

export default {
  name: 'agreement_modal',
  components: { Modal },
  props: {
    creator: Boolean,
  },
  destroyed() {
    document.body.classList.remove('noscroll');
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.unimplemented-modal.modal-outer .modal-inner {
  max-width: 420px;
  .unimplemented-content {
    box-sizing: border-box;
    padding-bottom: 32px;
    font-weight: 400;
    @include p_small;
    a {
      text-decoration: underline;
    }
  }
}

</style>
