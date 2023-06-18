<template>
<div class="projects-section-wrapper container">
  <FeaturedItem
    v-if="homePageMinimal && showContent"
    :project="signatureProject"
    :mirrored="mirrored"
  />
  <div v-if="!homePageMinimal && showContent" class="container">
    <ProjectSlider
      :projects="projects"
      :funded="$attrs.id === 'funded'"
      :title="title"
      :subTitle="subTitle"
      :loading="!projects"
      @viewAll="showUnimplemented = true"
    />
  </div>
  <slot />
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import FeaturedItem from '@/components/home/FeaturedItem.vue';
import ProjectSlider from '@/components/home/ProjectSlider.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

import { homePageMinimal } from '@/utils/config';

export default {
  name: 'project_showcase',
  components: {
    FeaturedItem,
    ProjectSlider,
    UnimplementedModal,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    showContent: {
      type: Boolean,
      default: true,
    },
    mirrored: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showUnimplemented: false,
      homePageMinimal,
    };
  },
  computed: {
    signatureProject() {
      return this.projects ? this.projects[0] : {};
    },
  },
};
</script>

<style lang="scss" scoped>
.projects-section-wrapper {
  display: flex;
  justify-content: center;
  .container {
    z-index: 2;
  }
}

@media (max-width: $mobile-width) {
  .projects-section-wrapper {
    padding: 0;
  }
}
</style>
