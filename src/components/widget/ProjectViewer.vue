<template>
<div class="project-viewer">
  <div class="logo">
    <div
      :style="{backgroundImage: `url(${project.main_image.url})`}"
      class="logo-img"
    />
    <router-link
      v-if="isCreator"
      class="actions"
      :to="{ name: 'project', params: {id: project.id, tab: 'campaign'}}"
    >
      {{ $t('edit') }}
    </router-link>
    <router-link
      v-else
      class="actions"
      :to="{ path: '/vote' }"
    >
      {{ $t('project.buttonText.vote_now') }}
    </router-link>
  </div>
  <!-- eslint-disable vue-i18n/no-raw-text -->
  <div class="info">
    <h5 class="title">
      {{ project.name }}
    </h5>
    <div class="status">
      <span class="start-date">{{ startDate }}</span> |
      <span :class="['progress', status ]">
        {{ $t('project.status')[status] }}
      </span>
    </div>
    <p class="description">
      {{ project.blurb }}
    </p>
    <div class="funding-status">
      {{ $tc('project.funded', fundingPercent) }} |
      {{ $tc('project.raised', raised) }} |
      {{ $t('project.fundingStatus')[fundingStatus] }}
    </div>
  </div>
  <!-- eslint-enable vue-i18n/no-raw-text -->
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'project-viewer',
  props: {
    project: {
      type: Object,
      default: null,
    },
    creator: {
      type: Object,
      default: null,
    },
    isCreator: Boolean,
  },
  computed: {
    startDate() {
      return this.project.start_time.format('MMMM d, YYYY');
    },
    fundingPercent() {
      return Math.ceil(100 * (this.project.total_pledged / this.project.funding_goal));
    },
    status() {
      const currentTime = moment();
      const { start_time: startTime, end_time: endTime } = this.project;
      if(currentTime < startTime) {
        return 'not_started';
      }
      if(currentTime >= startTime && currentTime < endTime) {
        return 'live';
      }
      return 'complete';
    },
    fundingStatus() {
      return this.project.total_pledged >= this.project.funding_goal ? 'successful' : 'not_reached';
    },
    raised() {
      return this.$options.filters.from_cents(this.project.total_pledged);
    },
  },
};
</script>

<style lang="scss">
.project-viewer {
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid $grey-light;

  &:last-of-type {
    border-bottom: none;
  }

  .logo {
    .logo-img {
      margin-right: 50px;
      margin-bottom: 5px;
      width: 172px;
      height: 97px;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }

    .actions {
      font-family: $font-normal;
      line-height: 24px;
      font-size: 16px;
      color: #ff5728;
    }
  }

  .info {
    font-family: $font-normal;
    line-height: 25px;
    font-size: 16px;
    color: $main-black;
    width: calc(100% - 220px);

    .title {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 22px;
    }

    .status {
      font-family: $font-normal;
      line-height: 24px;
      font-size: 14px;
      color: $grey;

      .live {
        color: $main-orange;
      }

      .complete {
        color: $main-blue;
      }
    }

    .description {
      margin: 0;
      min-height: 55px;
    }

    .funding-status {
      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
      color: $main-blue;
    }
  }
}
</style>
