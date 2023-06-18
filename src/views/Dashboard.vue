<template>
<div v-if="project" class="dashboard">
  <div class="dashboard-main-wrap">
    <!-- eslint-disable vue-i18n/no-raw-text -->
    <div class="container-content">
      <div class="dashboard-info">
        <div class="dashboard-info-left">
          <h1>{{ project.name }}</h1>
          <div class="team">
            <router-link class="creator" :to="{ name: 'user-public', params: {id: project.creator.id}}">
              <img :src="project.creator | avatar">
              <span>{{ project.creator.name }}</span>
            </router-link>
            <div class="manage" @click="showManageTeamModal = true">
              <a href="#">{{ $t('dashboard.manage') }}</a>
            </div>
          </div>
        </div>
        <div class="dashboard-info-right">
          <div class="preview" @click="showUnimplemented = true">
            {{ $t('dashboard.preview') }}
          </div>
          <div class="publish" @click="showUnimplemented = true">
            {{ $t('dashboard.publish') }}
          </div>
        </div>
      </div>
      <div class="dashboard-main">
        <DashboardLink
          :copy="$t('dashboard.basics')"
          :icon="'basics_small.png'"
          link="dashboard-basics"
        >
          {{ basicsCompleted }} {{ $t('of') }} {{ basicsCompletedArray.length }}
        </DashboardLink>
        <DashboardLink
          :copy="$t('dashboard.overview')"
          :icon="'overview_small.png'"
          link="dashboard-overview"
        >
          {{ $t('start') }}
        </DashboardLink>
        <DashboardLink
          :copy="$t('dashboard.rewards')"
          :icon="'rewards_small.png'"
          link="dashboard-rewards"
        >
          {{ project.rewards.length }} {{ $t('dashboard.rewards.title') }}
        </DashboardLink>
        <DashboardLink
          :copy="$t('dashboard.timeline')"
          :icon="'timeline_small.png'"
          link="dashboard-timeline"
        >
          {{ project.milestones.length }} {{ $t('dashboard.milestones') }}
        </DashboardLink>
        <DashboardLink
          :copy="$t('dashboard.account')"
          :icon="'account_small.png'"
          link="dashboard-account"
        >
          0 {{ $t('of') }} 8
        </DashboardLink>
      </div>
      <hr>
      <div class="dashboard-secondary">
        <DashboardLink :copy="$t('dashboard.faq')" :secondary="true" @click.native="showUnimplemented = true">
          0
        </DashboardLink>
        <DashboardLink :copy="$t('dashboard.bonuses')" :secondary="true" @click.native="showUnimplemented = true">
          0
        </DashboardLink>
      </div>
      <Handbook />
      <Search />
    </div>
    <!-- eslint-enable vue-i18n/no-raw-text -->
  </div>
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
  <ManageTeamModal
    v-if="showManageTeamModal"
    :project="project"
    @hideModal="showManageTeamModal = false"
  />
</div>
</template>

<script>
import * as api from '@/utils/api';
import DashboardLink from '@/components/builder/DashboardLink.vue';
import Handbook from '@/components/manager/Handbook.vue';
import Search from '@/components/manager/Search.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';
import ManageTeamModal from '@/components/widget/ManageTeamModal.vue';

const validIterable = value => (
  value && value.length > 0
);

const validNumber = value => (
  Number.isInteger(value) && (value > 0)
);

const validDuration = days => (
  (days >= 15) && (days <= 60)
);

export default {
  name: 'dashboard',
  components: {
    DashboardLink,
    Handbook,
    Search,
    UnimplementedModal,
    ManageTeamModal,
  },
  data() {
    return {
      project: null,
      showUnimplemented: false,
      showManageTeamModal: false,
    };
  },
  computed: {
    // An array of boolean values corresponding to completed Basics fields
    basicsCompletedArray() {
      const {
        name,
        blurb,
        category,
        location,
        main_image: mainImage,
        video,
        images,
        social_image: socialImage,
        funding_goal: fundingGoal,
        duration,
      } = this.project;

      const categoryId = category ? category.id : 0;
      return [
        validIterable(name),
        validIterable(blurb),
        validNumber(categoryId),
        validIterable(location),
        validIterable(mainImage),
        validIterable(video),
        validIterable(images),
        validIterable(socialImage),
        validNumber(fundingGoal),
        validDuration(duration),
      ];
    },
    basicsCompleted() {
      return this.basicsCompletedArray
        .reduce((acc, curVal) => (curVal ? 1 : 0) + acc, 0);
    },
  },
  async created() {
    try {
      this.project = await api.getCreatorProjectDetail(this.$route.params.id);
    } catch(err) {
      console.log('Error fetching project data: ', err);
    }
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.dashboard {
  .dashboard-main-wrap {
    background-image: linear-gradient($blue-light, $white);
  }
  .dashboard-info {
    display: flex;
    align-items: center;
    margin-top: 32px;
    .dashboard-info-left {
      width: 45%;

      > h1 {
        margin: 0 0 15px 0;
      }
      .team {
        display: flex;
        align-items: center;
        .creator {
          display: flex;
          align-items: center;
          margin-right: 24px;
          margin-bottom: 10px;

          > img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 9px;
          }
          > span {
            padding-top: 4px;
            @include subheading;
          }
        }
        .manage {
          @include button_small_text;
          top: -3px;
          position: relative;
        }
      }
    }
    .dashboard-info-right {
      margin-left: auto;
      .preview {
        @include button($blue-med, small);
        color: $main-blue;
        padding: 3px 16px 0;
        margin-right: 24px;
      }
      .publish {
        @include button($grey-button, small);
        color: #fbfbf3;
        padding: 3px 16px 0;
      }
    }
  }
  .dashboard-main {
    margin: 48px 0 56px;
    > a > div {
      margin-top: 16px;
    }
  }
  .dashboard-secondary {
    display: flex;
    justify-content: space-between;
    margin: 56px 0;
    > a {
      width: calc(50% - 24px);
    }
  }
}
</style>
