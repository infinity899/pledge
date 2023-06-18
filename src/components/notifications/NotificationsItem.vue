<template>
<div
  target="_blank"
  class="notification-item"
  :class="{ 'large': large, 'read': notification.read }"
  @click="$emit('markRead', notification.id)"
>
  <a :href="notificationUrl" target="_blank" />
  <div class="notification-image" />
  <div class="notification-main">
    <div class="notification-header">
      <div class="notification-title">
        {{ notification.title }}
      </div>
      <div class="notification-date">
        <div v-if="!notification.read" class="date-unread" />
        <div class="date-text">
          {{ getElapsed(notification.date) }}
        </div>
      </div>
    </div>
    <div class="notification-subtitle">
      {{ notification.subtitle }}
    </div>
    <div class="notification-description">
      {{ notification.body }}
    </div>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';

export default {
  name: 'notifications_item',
  props: {
    notification: {
      type: Object,
      default: null,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    notificationUrl() {
      const { notification } = this;
      if(notification.object_type === 'PROJECT_COMMENT') {
        return `/project/${notification.resource_id}/discussion`;
      }
      if(notification.object_type === 'PROJECT_UPDATE') {
        return `/project/${notification.resource_id}/#campaign-timeline`;
      }
      if(notification.object_type === 'MILESTONE_EVENT') {
        return `/project/${notification.resource_id}`;
      }
      return `/project/${notification.resource_id}`;
    },
  },
  methods: {
    getElapsed(date) {
      const now = moment();
      const end = moment(date);
      const duration = moment.duration(now.diff(end));

      const weeks = duration.asWeeks();
      const days = duration.asDays();
      const hours = duration.asHours();
      const minutes = duration.asMinutes();
      if(weeks > 1) {
        return `${this.$tc('time.weeks_ago', Math.round(weeks))}`;
      }
      if(days > 1) {
        return `${this.$tc('time.days_ago', Math.round(days))}`;
      }
      if(hours > 1) {
        return `${this.$tc('time.hours_ago', Math.round(hours))}`;
      }
      return `${this.$tc('time.minutes_ago', Math.round(minutes))}`;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
@import 'globals.scss';

.notification-item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  padding: 24px 16px 20px;
  border-bottom: 1px solid $border-light;
  border-radius: 3px;
  color: $main-black;
  cursor: pointer;
  min-width: 0;
  > a {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  &.large {
    border: 1px solid $border-light;
    margin-top: 16px;
  }
  &.read {
    background-color: $bg-grey-light;
  }
}

.notification-image {
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: black;
}

.notification-main {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  .notification-header {
    max-height: 16px;
    .notification-title {
      @include h5;
      display: inline-block;
      vertical-align: top;
      line-height: 14px;
      max-width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      @media (max-width: 540px) {
        max-width: 160px;
      }
      @media (max-width: 370px) {
        max-width: 100px;
      }
    }
    .notification-date {
      margin-left: auto;
      margin-right: 2px;
      float: right;
      display: flex;
      .date-text {
        @include subheading;
        color: $grey2;
        text-transform: uppercase;
        line-height: 12px;
      }
      .date-unread {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: $orange-med;
        margin: 2px 8px 0;
      }
    }
  }

  .notification-subtitle {
    @include h5;
    color: $grey2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notification-description {
    @include p_small;
    padding-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $font-title;
  }
}

</style>
