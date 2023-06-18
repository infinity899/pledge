<template>
<div class="notifications-menu-wrap">
  <div class="notifications-header">
    <div class="header-title">
      {{ $t('header.notificationsMenu.notifications') }}
    </div>
    <div
      v-if="notifications.length"
      class="mark-read"
      @click="markAllRead"
    >
      {{ $t('header.notificationsMenu.mark_read') }}
    </div>
  </div>
  <div v-if="loading" class="spinner">
    <Spinner :size="40" />
  </div>
  <div v-else-if="notifications.length" class="notifications-list">
    <NotificationsItem
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
      @markRead="markRead"
    />
  </div>
  <div v-else class="empty">
    {{ $t('header.notificationsMenu.empty') }}
  </div>
  <div
    v-if="notifications.length"
    class="view-all"
    @click="viewAll"
  >
    {{ $t('header.notificationsMenu.view_all') }}
  </div>
</div>
</template>

<script>
import NotificationsItem from '@/components/notifications/NotificationsItem.vue';
import Spinner from '@/components/widget/Spinner';
import {
  getUserNotifications,
  markAllNotificationsRead,
} from '@/utils/api';

export default {
  name: 'user-menu',
  components: {
    NotificationsItem,
    Spinner,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      notifications: [],
      loading: true,
    };
  },
  methods: {
    async getNotifications(refresh) {
      try {
        if(!refresh) {
          // don't show spinner if we're just refreshing data after calling markAllRead
          this.loading = true;
        }
        const { data: { notifications } } = await getUserNotifications({
          page: 1,
          perPage: 4,
        });
        this.notifications = notifications.slice(0, 4);
        this.loading = false;
      } catch(err) {
        this.loading = false;
        console.log('err: ', err);
      }
    },
    markRead() {
      console.log('mark read clicked');
    },
    async markAllRead(e) {
      e.stopPropagation();
      try {
        await markAllNotificationsRead();
        this.getNotifications(true);
      } catch(err) {
        console.log('Error marking all read.');
      }
    },
    viewAll() {
      this.$router.replace({ path: '/notifications' });
    },
  },
  created() {
    this.getNotifications();
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.notifications-menu-wrap {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1px;
  background-color: $white;
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.15);
  @include h5;
  min-width: 355px;
  width: 483px;
  padding: 0 1px;

  .notifications-header {
    display: flex;
    justify-content: space-between;
    padding: 25px 18px 12px;
    box-shadow: 0 1.5px 0 $border-light;
    .header-title {
      @include h4;
    }
    .mark-read {
      @include subheading;
      color: $main-blue;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  .notifications-list {
    .created-project-item {
      display: flex;
      padding-top: 15px;

      .p-image {
        width: 48px;
        height: 64px;
        object-fit: cover;
        margin-right: 15px;
      }
      .p-url {
        color: $main-blue;
      }
    }

    .backed-project-list {
      .backed-project-item {
        a {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;

          &::after {
            display: block;
            content: "";
            background-image: url('../../static/img/icons/ic_right.png');
            width: 6px;
            height: 9px;
            background-size: 6px;
            opacity: 0.5;
            position: absolute;
            top: 6px;
            right: 0;
          }
        }
        &.view-all-link {
          margin-top: 15px;

          a {
            color: $main-blue;
            display: block;
            &::after {
              background-image: url('../../static/img/icons/ic_right_blue.png');
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .view-all {
    @include button($main-black, large);
  }
  .spinner {
    padding: 25px 0;
    box-shadow: 0 1.5px 0 $border-light;
  }
  .empty {
    padding: 25px 0;
    margin: 0 auto;
    @include h5;
    font-size: 16px;
  }

  @media (max-width: $tablet-width) {
    margin-right: -40px;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
  @media (max-width: $mobile-width) {
    margin-right: -60px;
  }
  @media (max-width: 370px) {
    min-width: 300px;
  }
}
</style>
