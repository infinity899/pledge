<template>
<div v-if="project" class="dashboard-rewards-wrap">
  <DashboardHeader :tab="$t('dashboard.rewards.title')" />
  <div class="container">
    <div class="dashboard-content">
      <h1>{{ $t('dashboard.rewards.title') }}</h1>
      <TabBar
        :tabs="$t('dashboard.rewards.tabs')"
        :activeTab="activeTab"
        :onChangeTab="setTab"
      />
    </div>
  </div>
  <keep-alive>
    <component
      :is="activeComponent"
      :project="project"
      @refreshProjectData="getProjectData"
    />
  </keep-alive>
  <DashboardFooter :label="$t('dashboard.timeline.title')" link="dashboard-timeline" />
</div>
</template>

<script>
import * as api from '@/utils/api';
import DashboardHeader from '@/components/builder/DashboardHeader.vue';
import DashboardFooter from '@/components/builder/DashboardFooter.vue';
import Rewards from '@/components/builder/Rewards.vue';
import ShippingOptions from '@/components/builder/ShippingOptions.vue';
import TabBar from '@/components/widget/TabBar.vue';

export default {
  name: 'dashboard-rewards',
  components: {
    DashboardHeader,
    DashboardFooter,
    Rewards,
    ShippingOptions,
    TabBar,
  },
  data() {
    return {
      activeTab: this.$t('dashboard.rewards.tabs')[0],
      activeComponent: 'Rewards',
      project: null,
      staleTimer: null,
      stale: new Set(),
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
      if(tab.label === 'Rewards') {
        this.activeComponent = 'Rewards';
      } else {
        this.activeComponent = 'ShippingOptions';
      }
    },
    async getProjectData() {
      try {
        const project = await api.getCreatorProjectDetail(this.$route.params.id);
        this.project = project;
      } catch(err) {
        console.log('Error getting project data: ', err);
      }
    },
  },
  created() {
    this.getProjectData();
  },
};

</script>

<style lang="scss">
@import 'general.scss';
@import 'snippets.scss';

.dashboard-rewards-wrap {
  .tab-bar {
    border-bottom: 1px solid $border-light;
  }
}
</style>
