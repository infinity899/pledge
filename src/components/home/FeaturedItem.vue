<template>
<div :class="['top-featured-wrap', {'mirrored': mirrored}]">
  <div class="top-featured">
    <div class="tf-image-wrap">
      <div class="tf-image" :style="{ 'background-image': `url(${project.main_image.url})`}">
        <PercentageTag
          :message="$t('project.campaign.backer_protection_title', { n: project.reserve_percent })"
        />
      </div>
    </div>
    <div class="tf-info">
      <div class="h2 tf-title">
        {{ project.name }}
      </div>
      <div class="subheading tf-status">
        <div class="fund">
          <img :src="require('@/static/img/icons/ic_raised.svg')">
          <span>{{ $tc('project.raised', raised) }}</span>
        </div>
        <div class="time">
          <img :src="require('@/static/img/icons/ic_time.svg')">
          <span>{{ $tc('project.days_left', daysLeft) }}</span>
        </div>
        <div class="creator">
          <router-link :to="{ name: 'user-public', params: {id: project.creator.id}}">
            <img :src="project.creator | avatar">
            <span>{{ $tc('project.by', project.creator.name) }}</span>
          </router-link>
        </div>
      </div>
      <div class="p_small tf-desc">
        {{ project.blurb }}
      </div>
      <div class="tf-view">
        <router-link
          :to="`/project/${project.id}/campaign`"
          class="btn-view"
        >
          {{ $t('project.view_project') }}
        </router-link>
      </div>
      <div class="tf-progress">
        <ProgressBar :percent="53" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import PercentageTag from '@/components/widget/PercentageTag.vue';
import ProgressBar from '@/components/widget/ProgressBar.vue';

export default {
  name: 'featured-item',
  components: {
    ProgressBar,
    PercentageTag,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    mirrored: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    daysLeft() {
      return this.project.end_time.diff(moment(), 'days');
    },
    raised() {
      return this.$options.filters.from_cents(this.project.total_pledged);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'widgets.scss';

.top-featured-wrap {
  width: 67.5%;
  z-index: 2;

  .top-featured {
    position: relative;
    min-height: 432px;

    .tf-status {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      margin-bottom: 20px;
      letter-spacing: 0.43px;

      > div {
        margin-right: 12px;
        display: flex;

        &:last-of-type {
          margin-right: 0;
        }

        span {
          margin-left: 5px;
        }
        img, .tf-status-img {
          position: relative;
          bottom: -2px;
        }

        img {
          width: 17px;
          height: 17px;
        }
      }

      .fund {
        color: #3d62e6;
      }
    }

    .tf-image-wrap {
      width: 490px;
      min-width: 460px;
      position: relative;

      .tf-image {
        background-size: cover;
        background-position: center;
        height: 650px;
        position: relative;
        z-index: 0;
      }

      &::before {
        content: ' ';
        background-image: url('../../static/img/art/dots.png');
        background-size: contain;
        background-repeat: repeat;
        background-position: 100% 100%;
        position: absolute;
        left: 192px;
        bottom: -60px;
        width: 347px;
        height: 260px;
      }

      .percentage-tag:not(.small) {
        top: 16px;
        left: 16px;
      }
    }

    .tf-info {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 480px;
      padding: 73px 33px 50px;
      background-color: $white;
      color: $main-black;
    }

    .tf-title {
      margin-bottom: 15px;
    }

    .tf-desc {
      color: $black-med;
      margin-bottom: 30px;
    }

    .btn-view {
      @include button;
    }

    .tf-progress {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: -4px;
    }
  }

  &.mirrored {
    .tf-image-wrap { left: 410px; }
    .tf-image-wrap::before { left: -48px; }
    .tf-info { left: 0; }
  }
}

@media (max-width: $tablet-width-large) {
  .top-featured-wrap {
    width: 100%;
    margin-bottom: 100px;

    &.mirrored .tf-image-wrap {
      left: auto;
      float: right;
    }

    .top-featured {
      .tf-image-wrap {
        &::before {
          content: none;
          display: none;
        }
        .tf-image { height: 600px; }
      }

      .tf-info {
        width: 440px;
        top: 465px;
      }

      .tf-status .creator { display: none; }
    }
  }
}

@media (max-width: $mobile-width) {
  .top-featured-wrap {
    margin-bottom: 200px;

    .top-featured {
      .tf-image-wrap {
        min-width: unset;
        width: 100%;
      }

      .tf-image-wrap .tf-image { height: 432px; }

      .tf-info {
        width: 90%;
        padding: 25px;
        top: 100%;
      }
    }
  }
}
</style>
