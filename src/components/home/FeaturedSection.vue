<template>
<div class="featured-section-content section">
  <FeaturedItem
    v-if="mostFeatured"
    :project="mostFeatured"
  />
  <div class="featured-list-wrap">
    <div class="subheading featured-label">
      {{ $t('project.featured') }}
    </div>
    <div class="featured-list">
      <ProjectItem
        v-for="(project, index) in featuredProjects"
        :key="index"
        class="featured-project-item"
        :project="project"
        :viewSmall="true"
      />
    </div>
  </div>
</div>
</template>

<script>
import FeaturedItem from '@/components/home/FeaturedItem.vue';
import ProjectItem from '@/components/widget/ProjectItem.vue';

export default {
  name: 'featured-section',
  components: {
    ProjectItem,
    FeaturedItem,
  },
  props: {
    projects: {
      type: Array,
      default: null,
    },
  },
  computed: {
    mostFeatured() {
      return this.projects ? this.projects[0] : {};
    },
    featuredProjects() {
      return this.projects ? this.projects.slice(1, 5) : {};
    },
    fundingPercent() {
      return Math.ceil(100 * (this.mostFeatured.total_pledged / this.mostFeatured.funding_goal));
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

#app .home .featured-section-content {
  display: flex;
  font-family: $font-title;
  margin-top: 0;
  width: 100%;

  .featured-label {
    color: $black-light;
    text-transform: uppercase;
    letter-spacing: 0.428571px;
  }

  .featured-list-wrap {
    margin-left: 6.5%;

    .featured-project-item {
      margin-top: 40px;

      &:first-of-type {
        margin-top: 25px;
      }
    }
  }

  @media (max-width: $tablet-width-large) {
    max-width: $tablet-width;
    margin: auto;
    flex-direction: column;

    .featured-list-wrap {
      margin: 0 30px;

      .featured-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }

  @media (max-width: $mobile-width) {
    max-width: $mobile-width;
    margin: auto;
    flex-direction: column;

    .featured-list-wrap {
      .featured-list {
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
}
</style>
