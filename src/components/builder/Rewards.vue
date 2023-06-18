<template>
<div v-if="project" class="rewards container">
  <div class="dashboard-content">
    <h3>{{ $t('dashboard.rewards.rewards_title') }}</h3>
    <div class="text">
      {{ $t('dashboard.rewards.rewards_text1') }}
    </div>
    <div class="text">
      {{ $t('dashboard.rewards.rewards_text2') }}
    </div>
    <div class="new-reward">
      <button class="btn-new-reward" @click="showRewardModal = true">
        {{ $t('dashboard.rewards.new_reward') }}
      </button>
    </div>
  </div>
  <RewardList
    :project="project"
    :edit="true"
    @rewardEvent="onRewardEvent"
  />
  <RewardModal
    v-if="showRewardModal"
    :selectedReward="selectedReward"
    @hideModal="showRewardModal = false; selectedReward = null"
    @refreshProjectData="$emit('refreshProjectData')"
  />
</div>
</template>

<script>
import RewardList from '@/components/widget/RewardList.vue';
import RewardModal from '@/components/builder/RewardModal.vue';

export default {
  name: 'dashboard-rewards-rewards',
  components: {
    RewardList,
    RewardModal,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showRewardModal: false,
      selectedReward: null,
    };
  },
  watch: {
    project(val) {
      if(this.selectedReward) {
        for(let i = 0; i < val.rewards.length; i += 1) {
          const reward = val.rewards[i];
          if(reward.id === this.selectedReward.id) {
            this.selectedReward = reward;
          }
        }
      }
    },
  },
  methods: {
    onRewardEvent(data) {
      const { eventType, reward } = data;
      if(eventType === 'add') {
        this.selectedReward = reward;
        this.showRewardModal = true;
      }
    },
  },
};

</script>

<style lang="scss" scoped>
@import 'snippets.scss';
@import 'widgets.scss';

.rewards {
  margin-top: 72px;
  margin-bottom: 80px;
  .dashboard-content {
    .text {
      max-width: 500px;
      margin-top: 24px;
    }
    .new-reward {
      margin-top: 40px;
      .btn-new-reward {
        @include black-button;
      }
    }
  }
  .reward-list {
    margin-top: 48px;
  }
}
</style>
