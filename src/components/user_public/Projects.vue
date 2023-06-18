<template>
<div class="user-projects">
  <div class="user-project-wrap user-projects-created">
    <hr>
    <h3 class="page-title">
      {{ $t('user.public.projects.created') }}
    </h3>
    <div
      v-if="createdProjects.length"
      class="projects"
    >
      <ProjectViewer
        v-for="(project, index) in createdProjects"
        :key="index"
        :project="project"
      />
    </div>
    <div v-else class="user-empty-container">
      {{ $t('user.public.projects.projects_false') }}
    </div>
  </div>
  <div class="user-project-wrap user-projects-backed">
    <hr>
    <h3 class="page-title">
      {{ $t('user.public.projects.backed') }}
    </h3>
    <div v-if="pledgedProjects.length > 0">
      <div class="backed-projects">
        <ProjectViewer
          v-for="(project, index) in pledgedProjects"
          :key="index"
          :project="project"
        />
      </div>
    </div>
    <div v-else class="user-empty-container">
      {{ $t('user.public.projects.backed_false') }}
    </div>
  </div>
</div>
</template>

<script>
import ProjectViewer from '@/components/widget/ProjectViewer.vue';

export default {
  name: 'projects',
  components: {
    ProjectViewer,
  },
  props: {
    profile: {
      type: Object,
      default: null,
    },
    createdProjects: {
      type: Array,
      default: null,
    },
    pledgedProjects: {
      type: Array,
      default: null,
    },
  },
};
</script>
