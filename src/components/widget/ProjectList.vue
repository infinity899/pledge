<template>
<div id="projects">
  <div
    v-for="project in projects"
    :key="project.id"
    class="project"
    @click="$router.push({name: 'project', params: {id: project.id, tab: 'campaign'}})"
  >
    <ProjectItem
      :project="project"
      :searchPage="$route.name === 'search'"
    />
  </div>
</div>
</template>

<script>
import ProjectItem from '@/components/widget/ProjectItem.vue';

export default {
  name: 'project-list',
  components: {
    ProjectItem,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
#projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > .spinner {
    margin: 48px auto 0 auto;
  }

  .project {
    width: 22%;
    margin-bottom: 100px;
    margin-right: 4%;
    position: relative;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (max-width: $tablet-width) {
    .project {
      width: 45%;
      margin-bottom: 60px;
      margin-right: 10%;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }

  @media (max-width: $mobile-width) {
    .project {
      width: 100%;
      margin-right: 0;
    }
  }
}

</style>
