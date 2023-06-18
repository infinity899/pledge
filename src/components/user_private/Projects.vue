<template>
<div
  class="user-projects"
  :class="{ 'created-many': createdProjects.length > 1 }"
>
  <div class="user-projects-created">
    <hr>
    <h3 class="created-title">
      {{ $t('user.private.projects.created') }}
    </h3>
    <ProjectSlider
      v-if="createdProjects.length"
      class="projects"
      :projects="createdProjects"
      :showViewAll="false"
    />
    <div v-else class="user-empty-container">
      <div>
        {{ $t('user.private.projects.projects_false') }}
      </div>
      <button @click="$router.push({ path: '/create' })">
        {{ $t('user.private.projects.created_btn') }}
      </button>
    </div>
  </div>
  <div class="user-projects-backed">
    <hr>
    <h3 class="backed-title">
      {{ $t('user.private.projects.backed') }}
    </h3>
    <div v-if="pledgedProjects.length > 0">
      <div class="backed-projects">
        <ProjectItem
          v-for="(project, index) in pledgedProjects"
          :key="index"
          :project="project"
          :viewSmall="true"
        />
      </div>
    </div>
    <div v-else class="user-empty-container">
      <div>
        {{ $t('user.private.projects.backed_false') }}
      </div>
      <button @click="showUnimplemented = true">
        {{ $t('header.explore_projects') }}
      </button>
    </div>
  </div>
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import ProjectItem from '@/components/widget/ProjectItem.vue';
import ProjectSlider from '@/components/home/ProjectSlider.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'projects',
  components: {
    ProjectItem,
    ProjectSlider,
    UnimplementedModal,
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
  data() {
    return {
      showUnimplemented: false,
    };
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.user-projects {
  box-sizing: border-box;
  padding: 50px 80px;
  display: flex;
  flex-wrap: wrap;

  .created-title {
    margin-bottom: 16px;
  }

  .backed-title {
    margin-bottom: 48px;
  }

  .user-projects-backed {
    flex-grow: 1;
  }

  .user-projects-created {
    width: 460px;
    .container {
      padding: 0;
    }
  }

  .user-empty-container {
    @include h4;
    background-color: $bg-grey-light;
    color: $grey70;
    text-align: center;
    min-width: 297px;
    padding: 40px 0;

    button {
      @include button($main-blue, small, secondary);
      @include button_small_text;
      margin-top: 24px;
    }
  }

  &.created-many {
    .created-title {
      margin-bottom: 0;
    }
    .user-projects-created,
    .user-projects-backed {
      width: 100%;
    }
  }

  @media (max-width: $tablet-width-large) {
    padding: 0 20px;
    .user-projects-created {
      width: 100%;
    }
  }
}
</style>

