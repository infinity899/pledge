<template>
<div v-if="project" class="project-info">
  <div class="container project-info-wrap">
    <div class="project-info-left">
      <h1 class="title">
        {{ project.name }}
      </h1>
      <div class="members">
        <router-link class="member" :to="{ name: 'user-public', params: {id: project.creator.id}}">
          <img :src="project.creator | avatar">
          <span class="subheading">{{ project.creator.name }}</span>
        </router-link>
      </div>
      <p class="p_large blurb">
        {{ project.blurb }}
      </p>
    </div>
    <div v-if="projectActive" class="project-info-right">
      <div class="funding">
        <h1>{{ project.total_pledged | from_cents }}</h1>
        <h4>
          {{ $tc('project.funding_goal', $options.filters.from_cents(project.funding_goal)) }}
        </h4>
      </div>
      <div class="left-days">
        <h1>{{ daysLeft }}</h1>
        <h4>{{ $tc('project.days_left_text', daysLeft) }}</h4>
      </div>
      <div class="backers">
        <h1>{{ project.backer_count }}</h1>
        <h4>{{ $t('project.backers') | capitalize }}</h4>
      </div>
    </div>
    <div v-if="projectActive" class="project-info-progress">
      <ProgressBar :percent="fundingPercent" :height="8" :showTooltip="true" />
    </div>
  </div>
  <div v-if="!projectActive" class="container project-info-statusbar">
    <div class="statusbar-wrap">
      <div class="statusbar-left">
        {{ reachedGoal ? $t('project.success') : $t('project.failed') }}
      </div>
      <div class="status-items">
        <div class="status-item">
          <img
            class="status-img"
            :src="require('@/static/img/icons/ic_check_done.png')"
          >
          <div>
            {{ $tc('project.funded', fundingPercent) }}
          </div>
        </div>
        <div class="status-item">
          <img
            class="status-img"
            :src="require('@/static/img/icons/ic_funds_raised.png')"
          >
          <div>
            {{ $tc('project.raised', raised) }}
          </div>
        </div>
        <div class="status-item">
          <img
            class="status-img"
            :class="'backers'"
            :src="require('@/static/img/icons/ic_backers_blue.png')"
          >
          <div>
            {{ $tc('project.backer_count', project.backer_count) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container project-info-images">
    <ImageCarousel :images="images" />
  </div>
</div>
</template>

<script>
import * as moment from 'moment';
import ProgressBar from '@/components/widget/ProgressBar.vue';
import ImageCarousel from '@/components/widget/ImageCarousel.vue';

export default {
  name: 'project-info',
  components: {
    ProgressBar,
    ImageCarousel,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    projectActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      videoId: 'BBJa32lCaaY',
      show: 1,
      kycActive: 0,
    };
  },
  computed: {
    fundingPercent() {
      return Math.ceil(100 * (this.project.total_pledged / this.project.funding_goal));
    },
    daysLeft() {
      if(this.project.end_time) {
        const dayleft = this.project.end_time.diff(moment(), 'days');
        return dayleft < 0 ? 0 : dayleft;
      }
      return '';
    },
    images() {
      return [this.project.main_image, ...this.project.images, this.project.main_image, ...this.project.images];
    },
    raised() {
      return this.$options.filters.from_cents(this.project.total_pledged);
    },
    reachedGoal() {
      const {
        total_pledged: totalPledged,
        funding_goal: fundingGoal,
      } = this.project;
      return totalPledged >= fundingGoal;
    },
  },
  methods: {
    pledgeClicked() {
      this.$emit('setTab', {
        name: 'Campaign',
        hash: 'rewards',
      });
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
@import 'snippets.scss';

.project-info {
  .project-info-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 50px;
    max-width: 1110px;
    margin: auto;
  }

  .project-info-left {
    width: 45%;

    .title {
      margin: 0 0 15px 0;
    }

    .members {
      .member {
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
        }
      }
    }

    .blurb {
      margin: 30px 0 0 0;
    }
  }

  .project-info-right {
    margin-top: 40px;
    width: 45%;
    display: flex;
    justify-content: space-between;

    > div h1 {
      color: $main-blue;
    }
  }

  .project-info-progress {
    width: 100%;
    margin-top: 40px;
  }

  .project-info-statusbar {
    @include h4;
    width: 100%;
    margin-top: 40px;
    border-top: 1px solid $border-light;
    border-bottom: 1px solid $border-light;
    padding: 26px 0 16px;
    .statusbar-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      max-width: 1110px;
      margin: auto;
      padding: 0 20px;
      .statusbar-left {
        display: flex;
        align-items: center;
        margin-right: 48px;
      }
      .status-items {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: auto;
        .status-item {
          margin-bottom: 5px;
          .status-img {
            height: 20px;
            width: 20px;
            margin: 0 14px 0 24px;
            &.backers {
              width: 26px;
            }
          }
          > div {
            display: inline-block;
            vertical-align: top;
          }
        }
      }
    }
  }

  .project-info-images {
    margin: 40px auto 100px;
    overflow: hidden;
  }

  @media (max-width: $tablet-width-large) {
    .project-info-wrap {
      padding-top: 20px;
      padding-bottom: 60px;
    }
    .project-info-left, .project-info-right {
      width: 100%;
      max-width: 520px;
    }
    .project-info-progress {
      margin-top: 50px;
    }
    .project-info-images {
      margin-bottom: 40px;
    }
  }

  // Hack for aligning wrapped flexbox
  @media (max-width: 948px) {
    .project-info-statusbar .statusbar-wrap .status-items {
      max-width: 365px;
      width: 365px;
      flex-shrink: 0;
    }
    .project-info-statusbar .statusbar-wrap .statusbar-left {
      margin-right: 0;
    }
  }

  @media (max-width: $tablet-width) {
    .project-info-wrap {
      padding-bottom: 35px;
    }
    .project-info-left {
      .title {
        @include h2;
      }
      .blurb {
        @include p_small;
        margin-top: 20px;
      }
    }
    .project-info-progress {
      margin-top: 10px;

      .progress-tooltip {
        display: none;
      }
    }
    .project-info-images {
      margin-bottom: 50px;
    }
  }

  @media (max-width: 520px) {
    .project-info-right {
      > div {
        h1 {
          font-size: 24px;
        }
        h4 {
          @include subheading;
        }
      }
    }
    .project-info-statusbar {
      .statusbar-wrap {
        flex-wrap: wrap;
        .status-items {
          display: block;
          margin-left: 0;
          margin-top: 24px;
          max-width: 250px;
          .status-item {
            .status-img {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>
