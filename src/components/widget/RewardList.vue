<template>
<div class="reward-list">
  <div
    v-for="reward in project.rewards"
    :key="reward.id"
    class="reward-card-wrap"
  >
    <RewardCard
      :reward="reward"
      :projectId="project.id"
      :status="RewardStatus.ADD"
      :projectActive="projectActive"
      :edit="edit"
      @rewardEvent="$emit('rewardEvent', $event)"
    />
  </div>
  <div v-if="projectActive" class="reward-card-wrap">
    <RewardCard
      :projectId="project.id"
      :status="RewardStatus.DONATION"
      :projectActive="projectActive"
      :edit="edit"
      @rewardEvent="$emit('rewardEvent', $event)"
    />
  </div>
</div>
</template>

<script>
import RewardCard from '@/components/widget/RewardCard.vue';
import { RewardStatus, ProjectStage } from '@/utils/constants';

export default {
  name: 'reward-list',
  components: {
    RewardCard,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    projectStatus: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      RewardStatus,
    };
  },
  computed: {
    projectActive() {
      return this.projectStatus !== ProjectStage.INACTIVE;
    },
  },
};

</script>

<style lang="scss" scoped>
.reward-list {
  margin: 24px 0;
  display: flex;
  flex-wrap: wrap;

  .reward-card-wrap {
    padding: 24px 48px 24px 0;
    display: flex;
    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
