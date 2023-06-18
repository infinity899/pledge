<template>
<Modal
  class="subscribe-modal"
  :cancelable="true"
  :title="$t('project.subscribe.title')"
  :submitText="$t(authenticated ? 'confirm' : 'login')"
  :expanded="false"
  @submit="subscribe"
  @cancel="$emit('close')"
>
  <template v-slot:content>
    <div class="subscribe-text">
      {{ text }}
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';
import { subscribeProject } from '@/utils/api';

export default {
  name: 'two-factor-modal',
  components: {
    Modal,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
    text() {
      if(!this.authenticated) {
        return this.$t('project.subscribe.login');
      }
      if(this.project.subscribed) {
        return this.$t('project.subscribe.text2');
      }
      return this.$t('project.subscribe.text');
    },
  },
  methods: {
    async subscribe() {
      if(this.authenticated) {
        const result = await subscribeProject(this.project.id, !this.project.subscribed);
        this.$emit('subscribe', result);
      } else {
        const returnPath = window.location.pathname;
        this.$router.push({ name: 'login', query: { from: returnPath } });
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.subscribe-modal {
  .modal-header {
    text-align: center;
  }
  .subscribe-text {
    @include p_small;
    text-align: center;
    margin: 32px 0 40px;
  }
}
</style>
