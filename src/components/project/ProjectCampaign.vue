<template>
<div v-if="project" class="container project-campaign">
  <div id="project-rewards" class="rewards-section">
    <div class="rewards-header">
      <div class="rewards-header-title">
        <h2>{{ $t('project.campaign.rewards_title') }}</h2>
        <div class="p_large">
          {{ $t('project.campaign.rewards_desc') }}
        </div>
      </div>
      <div class="rewards-backer-protection">
        <div>
          <img :src="require('@/static/img/art_icons/backer_protection_small.png')">
        </div>
        <div>
          <h4>
            {{ $tc('project.campaign.backer_protection_title', project.reserve_percent) }}
          </h4>
          <p class="p_small">
            {{ $t('project.campaign.backer_protection_desc') }}
          </p>
          <a
            class="h5"
            target="_blank"
            href="https://medium.com/@pledgecamp/what-is-backer-protection-748cd34588b0"
          >
            {{ $t('learn_more') }}
          </a>
        </div>
      </div>
    </div>
    <RewardList
      :project="project"
      :projectStatus="status"
      @rewardEvent="onRewardEvent"
    />
  </div>
  <hr>
  <div class="flex-layout campaign-section">
    <div class="flex-left campaign-content">
      <h1>{{ $t('project.campaign.overview_title') }}</h1>
      <Markdown v-if="project" :content="project.description" />
    </div>
    <div id="campaign-timeline" class="flex-right">
      <MilestoneAccordion
        v-if="project"
        :title="$t('project.milestoneOverview')"
        :data="project.milestones"
        :milestoneClick="gotoMilestone"
      />
    </div>
  </div>
  <div class="flex-layout referral-section">
    <div class="flex-left copy-referral">
      <div class="h3">
        {{ $t('project.campaign.referral_desc') }}
      </div>
      <CopyButton
        :text="$t('project.campaign.copy_project_link')"
        :copyText="link"
        :icon="true"
      />
    </div>
    <div class="flex-right report-project">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.87988 3.12004C2.87988 2.4573 3.42859 1.92004 4.10545 1.92004C4.78231 1.92004 5.33101 2.4573 5.33101 3.12004V19.92C5.33101 20.5828 4.78231 21.12 4.10545 21.12C3.42859 21.12 2.87988 20.5828 2.87988 19.92V3.12004ZM16.397 10.08L21.9276 14.4072H21.926C22.0619 14.5133 22.1144 14.692 22.0568 14.8526C21.9992 15.0132 21.8441 15.1205 21.6702 15.12H9.90481C9.633 15.1203 9.37884 14.9882 9.22678 14.7676C9.07472 14.547 9.04467 14.2668 9.1466 14.02C9.41631 13.4629 9.86363 13.0066 10.4212 12.72H6.9651C6.73947 12.72 6.55657 12.541 6.55657 12.32V2.72004C6.55657 2.49913 6.73947 2.32004 6.9651 2.32004H11.8673C12.5442 2.32004 13.0929 2.8573 13.0929 3.52004V4.72004H20.8548C21.4006 4.72004 21.5746 4.97684 21.6302 5.13684C21.6857 5.29684 21.7152 5.60244 21.2887 5.93684L16.397 9.76804C16.349 9.80617 16.3211 9.86349 16.3211 9.92404C16.3211 9.9846 16.349 10.0419 16.397 10.08Z" fill="#EC4A29" />
      </svg>
      <p class="p_small">
        {{ $t('project.campaign.report_desc') }}
      </p>
      <div class="link" @click="showUnimplemented = true">
        {{ $t('project.campaign.flag_project') }}
      </div>
    </div>
  </div>
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import MilestoneAccordion from '@/components/project/MilestoneAccordion.vue';
import CopyButton from '@/components/widget/CopyButton.vue';
import Markdown from '@/components/widget/Markdown.vue';
import RewardList from '@/components/widget/RewardList.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'project-campaign',
  components: {
    MilestoneAccordion,
    CopyButton,
    Markdown,
    RewardList,
    UnimplementedModal,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    pledge: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showUnimplemented: false,
    };
  },
  computed: {
    link() {
      return `${window.location.origin}/project/${this.project.id}`;
    },
  },
  methods: {
    gotoMilestone(id) {
      this.$emit('setTab', {
        name: 'Milestones',
        query: { id },
      });
    },
    onRewardEvent(data) {
      this.$emit('rewardEvent', data);
    },
    calcStatus(/* reward */) {
      // TODO: Check sold status
    },
  },
};
</script>

<style lang="scss">
@import '@/static/css/widgets.scss';

.project-campaign {
  padding-top: 48px;
  padding-bottom: 48px;
  .flex-layout {
    display: flex;
    justify-content: space-between;
    .flex-left {
      width: 57%;
      margin-bottom: 48px;
    }
    .flex-right {
      width: 38%;
      margin-bottom: 48px;
    }
  }
  .rewards-section {
    margin-bottom: 48px;
    .rewards-header {
      display: flex;
      justify-content: space-between;
      .rewards-header-title {
        padding: 24px 0;
      }
      .rewards-backer-protection {
        display: flex;
        padding: 24px;
        background: $bg-grey-light;
        > div {
          p {
            margin: 0 0 10px 0;
          }
          &:first-of-type {
            margin-right: 24px;
            img {
              width: 37px;
            }
          }
        }
      }
    }
  }
  .campaign-section {
    margin-top: 50px;
    .campaign-content {
      padding: 50px 0;
      min-height: 400px;
      position: relative;
      box-sizing: border-box;
      > h1 {
        margin: 0 0 30px;
      }
      .markdown-container {
        h1 {
          font-size: 24px;
        }
        h2 {
          font-size: 18px;
        }
      }
    }
  }
  .referral-section {
    .copy-referral {
      .h3 {
        max-width: 600px;
        margin: 30px 0;
      }
      .copy-button {
        width: 220px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }
    .report-project {
      border-left: 1px solid $border-light;
      padding: 30px 80px;
      .link {
        color: $main-orange;
        cursor: pointer;
      }
      .p_small {
        max-width: 450px;
      }
    }
  }
  @media (max-width: $desktop-width-small) {
    .rewards-section .rewards-list {
      max-width: 700px;
      margin: 30px auto;
    }
    .campaign-section {
      display: flex;
      flex-direction: column;
      .campaign-content {
        width: 100%;
      }
      #campaign-timeline {
        width: 100%;
      }
    }
    .referral-section {
      .report-project {
        padding: 30px 40px;
      }
    }
  }
  @media (max-width: $tablet-width) {
    .rewards-section {
      .rewards-header {
        flex-direction: column;
      }
      .rewards-list {
        max-width: 297px;
        margin: 30px auto;
        .reward-card-wrap {
          padding-right: 0;
        }
      }
    }
    .flex-layout {
      display: flex;
      flex-direction: column;
      margin: auto;
      .flex-left {
        width: 100%;
      }
      .flex-right {
        width: 100%;
      }
    }
    .referral-section {
      .report-project {
        border-left: none;
        border-top: 1px solid $border-light;
        padding: 40px 0;
      }
    }
  }
  @media (max-width: $mobile-width) {
    .referral-section {
      .copy-referral {
        .h3 {
          @include h4;
          margin: 20px 0;
        }
      }
      .report-project {
        border-left: none;
        border-top: 1px solid $border-light;
        padding: 40px 0;
        margin: 0;
      }
    }
  }
}
</style>
