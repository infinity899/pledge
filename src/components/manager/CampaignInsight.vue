<template>
<div class="insights-section campaign-insight">
  <Collapsible
    :collapsible="status !== 'open'"
  >
    <template v-slot:header>
      <div class="insights-summary">
        <div>
          <div class="summary-header">
            {{ $t('manager.insights.metrics') }}
          </div>
          <div class="summary-details">
            <div>{{ $t('manager.insights.ended', { date: endDate }) }}</div>
            <div>{{ $tc('manager.insights.pledged', totalPledged) }}</div>
            <div>{{ $tc('manager.insights.funded', fundingPercentage) }}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <CampaignMetrics
        :project="project"
        :status="status"
      />
      <div class="insights-content">
        <div class="funding-progress">
          <div class="insights-header">
            {{ $t('manager.insights.progress') }}
          </div>
          <Graph
            :graphData="fundingData"
            :start="project.start_time"
            :end="project.end_time"
            :goal="project.funding_goal"
            :numRows="5"
            :status="status"
            :type="'funding'"
            :topLineColor="status === 'progress' ? '#2E40EA' : 'green'"
            :topTextColor="status === 'progress' ? '#2E40EA' : '#E6E6E6'"
          />
        </div>
        <Sources />
      </div>
      <Referrers :project="project" />
      <Rewards class="insights-rewards-wrap" />
    </template>
  </Collapsible>
</div>
</template>

<script>
import Collapsible from '@/components/widget/Collapsible.vue';
import CampaignMetrics from '@/components/manager/CampaignMetrics.vue';
import Graph from '@/components/manager/Graph.vue';
import Sources from '@/components/manager/Sources.vue';
import Referrers from '@/components/manager/Referrers.vue';
import Rewards from '@/components/manager/Rewards.vue';

import { formatWithCommas } from '@/utils/stringUtils';

export default {
  name: 'campaign-insight',
  components: {
    Collapsible,
    CampaignMetrics,
    Graph,
    Referrers,
    Rewards,
    Sources,
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
    fundingData: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    endDate() {
      const { end_time: endTime } = this.project;
      return endTime.format('MMM DD');
    },
    totalPledged() {
      const { total_pledged: totalPledged } = this.project;
      return formatWithCommas(totalPledged);
    },
    fundingPercentage() {
      const {
        total_pledged: totalPledged,
        funding_goal: fundingGoal,
      } = this.project;
      const percent = (totalPledged / fundingGoal) * 100;
      return percent.toFixed();
    },
  },
};
</script>
