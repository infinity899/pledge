<template>
<div class="project-item" :class="[viewClass]">
  <router-link
    v-if="viewSmall"
    :to="`/project/${project.id}/campaign`"
    class="project-link"
  />
  <div
    class="p-image"
    :style="{ 'background-image': `url(${project.main_image.url})` }"
  >
    <router-link
      v-if="!viewSmall"
      :to="`/project/${project.id}/campaign`"
      class="project-link"
    />
    <PercentageTag
      :message="tagMessage"
      :small="viewSmall"
    />
  </div>
  <div class="p-info">
    <div v-if="viewSmall" class="h4 p-title-small">
      {{ project.name }}
    </div>
    <div class="subheading p-status">
      <div class="fund">
        <img v-if="!viewSmall" :src="require('@/static/img/icons/ic_raised.svg')">
        <span>{{ $tc('project.raised', raised) }}</span>
      </div>
      <div class="time">
        <img v-if="!viewSmall" :src="require('@/static/img/icons/ic_time.svg')">
        <span>{{ $tc('project.days_left', endEndTime) }}</span>
      </div>
    </div>
    <div v-if="!viewSmall" class="text-normal">
      <div class="h3 p-title">
        <router-link
          :to="`/project/${project.id}/campaign`"
          class="project-link"
        />
        {{ project.name }}
      </div>
      <div class="p_small p-desc">
        {{ project.blurb }}
      </div>
    </div>
    <div class="p-progress">
      <ProgressBar :percent="fundingPercent" />
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import PercentageTag from '@/components/widget/PercentageTag.vue';
import ProgressBar from '@/components/widget/ProgressBar.vue';

export default {
  name: 'project-item',
  components: {
    ProgressBar,
    PercentageTag,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
    viewSmall: {
      type: Boolean,
      default: false,
    },
    searchPage: {
      type: Boolean,
      default: false,
    },
    funded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    viewClass() {
      if(this.viewSmall) {
        return 'small';
      }
      if(this.searchPage) {
        return 'search-page';
      }
      return 'normal';
    },
    fundingPercent() {
      return Math.ceil(100 * (this.project.total_pledged / this.project.funding_goal));
    },
    endEndTime() {
      return this.project.end_time.diff(moment(), 'days');
    },
    raised() {
      return this.$options.filters.from_cents(this.project.total_pledged);
    },
    tagMessage() {
      return this.funded ? this.$t('project.funded', { n: this.project.reserve_percent }) : `${this.project.reserve_percent}%`;
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

a.project-link {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.project-item {
  display: flex;
  width: 100%;
  max-width: 297px;
  position: relative;
  font-family: $font-title;

  .p-status {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: 15px;

    > div {
      margin-right: 15px;
      display: flex;
      align-items: center;

      span {
        margin-left: 5px;
      }
      img {
        margin-bottom: 4px;
      }
    }

    .fund {
      color: $main-blue;
    }
  }

  .p-image {
    height: 396px;
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;

    .percentage-tag:not(.small) {
      top: 16px;
      right: 16px;
    }
  }

  .p-info {
    color: $main-black;
    padding: 16px 0 26px 0;
  }

  .text-normal {
    position: relative;
    .p-title {
      margin-bottom: 8px;
      height: 64px;
      overflow: hidden;
    }

    .p-desc {
      color: rgba(0, 0, 0, 0.8);
      height: 48px;
      overflow: hidden;
    }
  }

  .p-progress {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  &.normal {
    flex-direction: column;
  }

  &.search-page {
    flex-direction: column;
    max-width: none;

    .p-image {
      height: 28vw;
      max-height: 60%;
    }
  }

  &.small {
    flex-direction: row;

    .p-status {
      flex-direction: column;
      align-items: flex-start;

      span {
        margin: 0;
      }
    }

    .p-image {
      width: 83px;
      height: 111px;
      margin-right: 25px;
      margin-bottom: 23px;
    }

    .p-info {
      width: calc(100% - 110px);
      padding: 0;
      height: 110px;
    }

    .p-title-small {
      margin-top: 5px;
      margin-bottom: 10px;
      height: 50px;
    }
  }

  @media (max-width: $tablet-width) {
    &.search-page {
      .p-image {
        height: 50vw;
      }
    }
  }

  @media (max-width: $mobile-width) {
    max-width: $mobile-width;
    &.normal {
      box-sizing: border-box;
      padding-right: 16px;
    }
    &.search-page {
      .p-title {
        height: unset;
      }
    }
  }
}
</style>
