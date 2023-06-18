<template>
<div v-if="project" class="overview-wrap">
  <DashboardHeader :showTabs="false" />
  <div class="container">
    <div class="dashboard-content">
      <h1>{{ $t('dashboard.faq.title') }}</h1>
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/utils/api';
import DashboardHeader from '@/components/builder/DashboardHeader.vue';

export default {
  name: 'dashboard-faq',
  components: {
    DashboardHeader,
  },
  data() {
    return {
      project: null,
      staleTimer: null,
      stale: new Set(),
    };
  },
  async created() {
    this.project = await api.getProjectDetail(this.$route.params.id);
  },
};

</script>

<style lang="scss">
@import 'general.scss';

.dashboard-content {
  margin-top: 72px;
  margin-bottom: 72px;
}
</style>
