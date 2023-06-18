<template>
<div class="builder-intro-modal">
  <div class="builder-intro container">
    <ModalHeader
      :quitText="$t('builder_intro.quit')"
      @hideModal="$emit('hideModal')"
    >
      <div class="intro-tabs">
        <div
          v-for="(tab, index) in $t('builder_intro.tabs')"
          :key="tab.label"
          class="tab"
          :class="{ selected: index === tabIndex, highlight: index < tabIndex }"
          @click="tabIndex = index"
        >
          <span>{{ tab.label }}</span>
          <Chevron
            class="chevron"
            :color="index < tabIndex ? '#2e40ea' : 'black'"
            :rotationAngle="90"
          />
        </div>
      </div>
    </ModalHeader>
    <transition name="intro-transition" mode="out-in">
      <component
        :is="activeTab.component"
        class="builder-intro-content"
        :type.sync="project.type"
        :name.sync="project.name"
        :categoryId.sync="project.categoryId"
        :eligible.sync="project.eligible"
        @nextTab="nextTab"
        @complete="onComplete"
      />
    </transition>
  </div>
</div>
</template>

<script>
import Chevron from '@/components/svg/Chevron.vue';
import ModalHeader from '@/components/widget/ModalHeader.vue';
import TabBar from '@/components/widget/TabBar.vue';
import BuilderIntroType from '@/components/builder/IntroType.vue';
import BuilderIntroName from '@/components/builder/IntroName.vue';
import BuilderIntroCategory from '@/components/builder/IntroCategory.vue';
import BuilderIntroEligibility from '@/components/builder/IntroEligibility.vue';
import { createProject } from '@/utils/api';

export default {
  name: 'home',
  components: {
    Chevron,
    ModalHeader,
    TabBar,
    BuilderIntroType,
    BuilderIntroName,
    BuilderIntroCategory,
    BuilderIntroEligibility,
  },
  data() {
    return {
      tabIndex: 0,
      project: {
        type: 'new-project',
        name: '',
        categoryId: -1,
        eligible: false,
      },
    };
  },
  computed: {
    activeTab() {
      return this.$t('builder_intro.tabs')[this.tabIndex];
    },
  },
  methods: {
    nextTab() {
      if(this.tabIndex < (this.$t('builder_intro.tabs').length - 1)) {
        this.tabIndex += 1;
      }
    },
    async onComplete() {
      const projectData = { name: this.project.name };
      if(this.project.categoryId !== -1) {
        projectData.category_id = this.project.categoryId;
      }
      const user = this.$store.getters.getProfile;
      if(user && user.email) {
        projectData.contact_email = user.email;
      }
      const { data } = await createProject(projectData);
      this.$emit('hideBuilder');
      this.$router.push({ name: 'dashboard', params: { id: data.project.id } });
    },
  },
  created() {
    if(this.$route.path === '/create/continue') {
      this.project.type = 'continue-project';
    } else {
      this.project.type = 'new-project';
    }
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.builder-continue-button {
  @include button($main-black, large);
  justify-content: space-between;
  padding: 4px 12px 0 12px;
  margin: 48px 0 24px;
  width: 300px;
  &.disabled {
    opacity: 0.3;
  }
}

.builder-intro-modal {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
  background-color: $white;
  z-index: 2000;

  .intro-header { margin-top: 80px; }

  .builder-intro {
    box-sizing: border-box;
    padding: 24px 40px 0;

    .intro-tabs {
      display: flex;
      flex-wrap: wrap;

      .tab {
        @include subheading;

        display: flex;
        opacity: 0.4;
        line-height: 32px;

        .chevron {
          height: 14px;
          margin: 8px 10px;
        }

        &:last-child .chevron { display: none; }

        span { cursor: pointer; }

        &.highlight,
        &.selected {
          opacity: 1;
          color: $main-blue;
        }

        &.selected {
          span {
            opacity: 1;
            border-bottom: 2px solid $main-blue;
          }
          .chevron { opacity: 0.4; }
        }
      }
    }
  }
  .intro-transition-enter-active {
    transition: opacity 0.3s ease;
  }
  .intro-transition-leave-active {
    transition: all 0.3s ease;
  }
  .intro-transition-enter {
    opacity: 0;
  }
  .intro-transition-leave-to {
    opacity: 0;
    transform: translate(-2em, 0);
  }
  .builder-intro-content {
    margin: 0 auto;
    max-width: 800px;
  }
}

@media (max-width: $mobile-width) {
  .builder-intro-modal {
    h1 { @include h2; }

    .intro-header { margin-top: 40px; }
    .builder-intro { padding: 24px 20px; }

    .intro-tabs {
      padding: 32px 0;

      .tab { white-space: nowrap; }
    }
  }
}
</style>
