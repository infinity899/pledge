<template>
<div v-if="project" class="dashboard-timeline-wrap">
  <DashboardHeader :tab="$t('dashboard.timeline.title')" />
  <div class="container">
    <div class="dashboard-content">
      <h1>{{ $t('dashboard.timeline.page_title') }}</h1>
      <div class="timeline-desc">
        {{ $t('dashboard.timeline.page_desc') }}
      </div>
      <div class="timeline-link">
        {{ $t('dashboard.timeline.link') }}
      </div>
    </div>
  </div>
  <div class="timeline-wrap">
    <div class="container">
      <div class="timeline-content dashboard-content">
        <div class="timeline-left">
          <TimelineMilestones
            :project="project"
            @onMilestoneClick="handleMilestoneClick"
          />
          <button class="timeline-left-add" @click="handleOpenModal">
            <!-- eslint-disable vue-i18n/no-raw-text -->
            + {{ $t('dashboard.timeline.button') }}
            <!-- eslint-enable vue-i18n/no-raw-text -->
          </button>
        </div>
        <div class="timeline-right">
          <h3>{{ $t('dashboard.timeline.right_title') }}</h3>
          <div class="timeline-right-desc">
            {{ $t('dashboard.timeline.right_desc') }}
          </div>
          <div class="timeline-right-item">
            <div>{{ $t('dashboard.timeline.project_fee') }}</div>
            <Info />
            <div>{{ $tc('dashboard.timeline.fee', 5) }}</div>
          </div>
          <div class="timeline-right-item">
            <div>{{ $t('dashboard.timeline.discount') }}</div>
            <Info />
            <!-- eslint-disable vue-i18n/no-raw-text -->
            <div>-</div>
            <!-- eslint-enable vue-i18n/no-raw-text -->
          </div>
          <div class="timeline-right-total">
            <div>
              <h4>{{ $t('dashboard.timeline.total_fee') }}</h4>
              <h5>{{ $t('dashboard.timeline.total_desc') }}</h5>
            </div>
            <h4>{{ $tc('dashboard.timeline.fee', 5) }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DashboardFooter :label="$t('dashboard.account.title')" link="dashboard-account" />
  <MilestoneModal
    v-if="showMilestoneModal"
    :selectedMilestone="selectedMilestone"
    :fundsRaised="project.total_pledged"
    @hideModal="handleCloseModal"
    @refreshProjectData="getProjectData"
  />
</div>
</template>

<script>
import * as api from '@/utils/api';
import DashboardHeader from '@/components/builder/DashboardHeader.vue';
import DashboardFooter from '@/components/builder/DashboardFooter.vue';
import TimelineMilestones from '@/components/builder/TimelineMilestones.vue';
import Info from '@/components/svg/Info.vue';
import MilestoneModal from '@/components/builder/MilestoneModal.vue';

export default {
  name: 'dashboard-timeline',
  components: {
    DashboardHeader,
    DashboardFooter,
    TimelineMilestones,
    Info,
    MilestoneModal,
  },
  data() {
    return {
      project: null,
      staleTimer: null,
      stale: new Set(),
      showMilestoneModal: false,
      selectedMilestone: null,
    };
  },
  methods: {
    handleMilestoneClick(milestone) {
      this.selectedMilestone = milestone;
      this.handleOpenModal();
    },
    async getProjectData() {
      try {
        this.project = await api.getCreatorProjectDetail(this.$route.params.id);
      } catch(err) {
        console.log('Error getting project data: ', err);
      }
    },
    handleOpenModal() {
      document.body.classList.add('noscroll');
      this.showMilestoneModal = true;
    },
    handleCloseModal() {
      document.body.classList.remove('noscroll');
      this.showMilestoneModal = false;
      this.selectedMilestone = null;
    },
  },
  async created() {
    this.getProjectData();
  },
};

</script>

<style lang="scss">
@import 'general.scss';
@import 'snippets.scss';
@import 'widgets.scss';

.dashboard-timeline-wrap {
  h1 {
    margin-bottom: 8px;
  }
  .timeline-desc {
    max-width: 500px;
  }
  .timeline-link {
    @include link;
    color: $main-blue;
    margin-top: 24px;
  }
  .timeline-wrap {
    background-color: $grey-lighter;
  }
  .timeline-content {
    display: flex;
    margin-top: 64px;
    padding-top: 64px;
    border-top: 1px solid $border;
    .timeline-left {
      flex-grow: 1;
      box-sizing: border-box;
      padding-right: 80px;
      .timeline-left-add {
        @include black-button($size: large);
        width: 100%;
      }
    }
    .timeline-right {
      margin-left: auto;
      width: 350px;
      box-sizing: border-box;
      padding-left: 32px;
      border-left: 1px solid $border-light;
      .timeline-right-desc {
        @include p_small;
        margin: 16px 0 24px;
        max-width: 280px;
      }
      .timeline-right-item {
        display: flex;
        height: 56px;
        align-items: center;
        border-top: 1px solid $border-light;
        div {
          @include h5;
          &:first-child {
            color: $grey;
            margin-right: 8px;
          }
          &:last-child {
            margin-left: auto;
          }
        }
      }
      .timeline-right-total {
        display: flex;
        margin-top: 24px;
        > h4 {
          margin-left: auto;
        }
        h5 {
          color: $grey;
        }
      }
    }
  }
}
</style>
