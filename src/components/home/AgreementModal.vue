<template>
<Modal
  :cancelable="false"
  :title="$t('agreement.title')"
  :submitText="$t('agreement.accept')"
  @submit="$emit('accept')"
>
  <template v-slot:content>
    <div class="agreement-content" v-html="$t('agreement.content')" />
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';

export default {
  name: 'agreement_modal',
  components: { Modal },
  destroyed() {
    document.body.classList.remove('noscroll');
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.modal-outer .modal-inner {
  .agreement-content {
    box-sizing: border-box;
    padding-bottom: 32px;
    @include p_small;
  }
}

</style>
