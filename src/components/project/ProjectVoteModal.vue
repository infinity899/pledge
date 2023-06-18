<template>
<Modal
  :title="$t('project.trust.vote_modal.title')"
  :submitText="submitText"
  :expanded="false"
  @submit="submitVote"
  @cancel="toggleModal('vote')"
>
  <template v-slot:content>
    <div class="vote-content">
      <p class="center-text p_small">
        {{ $t('project.trust.vote_modal.content') }}
      </p>
    </div>
    <div>
      <div class="refund-container">
        <div class="refund-text">
          {{ $t('project.trust.vote_modal.refund') }}
        </div>
        <div class="refund-amount-container">
          <!-- eslint-disable vue-i18n/no-raw-text -->
          <div class="refund-amount-pledge">
            <!-- TODO: replace with real data -->
            11.39 PLG
          </div>
          <div class="refund-amount-dollar">
            $11.39
          </div>
          <!-- eslint-enable vue-i18n/no-raw-text -->
        </div>
      </div>
      <div class="refund-info">
        <Info />
        <p class="p_info">
          {{ $t('project.trust.vote_modal.info') }}
        </p>
      </div>
    </div>
  </template>
</Modal>
</template>

<script>
import Modal from '@/components/widget/Modal.vue';
import Info from '@/components/svg/Info.vue';

export default {
  name: 'project-trust-modal',
  components: {
    Modal,
    Info,
  },
  props: {
    toggleModal: {
      type: Function,
      default: () => {},
    },
    submitVote: {
      type: Function,
      default: () => {},
    },
    pledgeVote: Boolean,
  },
  data() {
    return {
    };
  },
  computed: {
    submitText() {
      if(this.pledgeVote) {
        return this.$t('project.trust.vote_modal.change_vote');
      }
      return this.$t('project.trust.vote_modal.vote_refund');
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import 'widgets.scss';

.vote-content {
  margin-bottom: 32px;
}

.refund-container {
  @include h5;
  display: flex;
  align-items: center;
  border: 1px solid $border-light;
  padding: 16px;

  .refund-amount-container {
    display: flex;
    margin-left: auto;

    .refund-amount-pledge {
      margin-right: 24px;
      color: $grey;
    }
  }
}

.refund-info {
  display: flex;
  margin: 12px 0 30px 0;
  color: $grey;

  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
}
</style>
