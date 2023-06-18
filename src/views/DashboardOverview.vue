<template>
<div v-if="project" class="overview-wrap">
  <DashboardHeader
    :tab="$t('dashboard.overview.title')"
    :saveStatus="saveStatus"
  />
  <div class="container">
    <div class="dashboard-content">
      <h1>{{ $t('dashboard.overview.title') }}</h1>
      <Section :info="$t('dashboard.overview.main')" />
      <MarkdownEditor
        class="editor"
        :value="project.description"
        @input="project.description = $event; updated('description')"
      />
    </div>
  </div>
  <DashboardFooter :label="$t('dashboard.rewards.title')" link="dashboard-rewards" />
</div>
</template>

<script>
import DashboardHeader from '@/components/builder/DashboardHeader.vue';
import DashboardFooter from '@/components/builder/DashboardFooter.vue';
import MarkdownEditor from '@/components/widget/MarkdownEditor.vue';
import Section from '@/components/widget/Section.vue';
import AutoSaveProject from '@/components/mixins/AutoSaveProject';

export default {
  name: 'dashboard-overview',
  components: {
    DashboardHeader,
    Section,
    DashboardFooter,
    MarkdownEditor,
  },
  mixins: [AutoSaveProject],
};

</script>

<style lang="scss">
@import 'general.scss';
@import 'snippets.scss';

.dashboard-content {
  .basics-section .section-left h4 {
    @include h3;
  }
  .editor {
    height: 600px;
    margin-bottom: 80px;
    .tui-editor-contents {
      box-sizing: border-box;
      padding: 48px 10%;
    }
  }
}
</style>
