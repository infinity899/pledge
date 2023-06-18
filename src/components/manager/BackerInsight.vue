<template>
<div class="insights-section backer-insight">
  <BackerMetrics :project="project" />
  <div class="insights-content">
    <div class="funding-progress">
      <div class="insights-header">
        {{ $t('manager.insights.confidence') }}
      </div>
      <Graph
        :graphData="backerVoteData"
        :start="project.start_time"
        :end="project.end_time"
        :goal="100"
        :numRows="4"
        :status="status"
        :type="'backer'"
      />
    </div>
    <Milestones :project="project" />
  </div>
</div>
</template>

<script>
import Graph from '@/components/manager/Graph.vue';
import Milestones from '@/components/manager/Milestones.vue';
import BackerMetrics from '@/components/manager/BackerMetrics.vue';

export default {
  name: 'backer-insight',
  components: {
    Graph,
    Milestones,
    BackerMetrics,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    backerVoteData: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="scss">
.backer-insight {
  border-bottom: 1px solid $border-light;
}
</style>
