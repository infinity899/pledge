<template>
<div class="container">
  <div class="titlebar-main">
    <h2>{{ $t('notifications.header') }}</h2>
    <div class="titlebar-read" @click="markAllRead">
      {{ $t('notifications.mark') }}
    </div>
  </div>
  <div class="notifications-wrap">
    <div class="notifications-filter">
      <div class="notifications-types">
        {{ $t('notifications.types') }}
      </div>
      <CheckboxTree :initialData="types" :onCheck="typeChecked" />
    </div>
    <div v-if="showEmpty" class="empty">
      {{ $t('notifications.none') }}
    </div>
    <div class="notifications-list">
      <NotificationsItem
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"
        :large="true"
        @markRead="markRead"
      />
      <div v-if="!showEmpty && !lastPage && initLoaded" class="notifications-more" @click="getNotifications(page + 1)">
        {{ $t('notifications.more') }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CheckboxTree from '@/components/widget/CheckboxTree.vue';
import NotificationsItem from '@/components/notifications/NotificationsItem.vue';
import {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '@/utils/api';

export default {
  name: 'notifications',
  components: {
    CheckboxTree,
    NotificationsItem,
  },
  data() {
    return {
      notifications: [],
      initLoaded: false,
      perPage: 8,
      page: 1,
      totalPages: -1,
      types: this.$t('notifications.type_checks'),
    };
  },
  computed: {
    lastPage() {
      return this.totalPages === this.page;
    },
    showEmpty() {
      return (this.notifications.length === 0) && this.initLoaded;
    },
  },
  methods: {
    async typeChecked(_data) {
      this.notifications = [];
      this.totalPages = -1;
      this.initLoaded = false;
      await this.getNotifications(1);
    },
    async getNotifications(page) {
      if(this.lastPage) {
        return;
      }
      try {
        const types = this.types.children
          .filter(t => t.checked)
          .map(t => t.type);
        const { data: { notifications, pagination } } = await getUserNotifications({
          page,
          perPage: this.perPage,
          types,
        });
        this.page = page;
        this.totalPages = pagination.total_pages;

        const combined = [...this.notifications, ...notifications];
        this.notifications = this.sortNotifications(combined);
        this.initLoaded = true;
      } catch(err) {
        this.initLoaded = true;
      }
    },
    sortNotifications(notifications) {
      return notifications.sort((note1, note2) => note2.date - note1.date)
        .sort((note1, note2) => note1.read - note2.read);
    },
    markAllRead() {
      markAllNotificationsRead()
        .then(() => {
          this.notifications.map((n) => {
            n.read = true;
            return n;
          });
        })
        .catch((err) => {
          console.log('error marking notification read: ', err);
        });
    },
    markRead(id) {
      const selected = this.notifications.find(n => n.id === id);
      if(selected && !selected.read) {
        markNotificationRead(selected.id)
          .then(() => {
            selected.read = true;
          })
          .catch((err) => {
            console.log('error marking notification read: ', err);
          });
      }
    },
  },
  created() {
    this.getNotifications(1, 8);
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.titlebar-main {
  width: 100%;
  background-color: $white;
  box-sizing: border-box;
  padding-top: 48px;
  min-height: 96px;
  display: flex;
  justify-content: space-between;
}
.titlebar-read {
  @include subheading;
  cursor: pointer;
  color: $main-blue;
  align-self: flex-end;
}
.notifications-wrap {
  background-color: $white;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  min-height: 400px;

  .notifications-filter {
    .notifications-types {
      @include h5;
      margin-top: 16px;
    }
    .p-checkbox-tree > .p-checkbox-wrap {
      display: flex;
      flex-direction: column;
      min-width: 240px;
      margin-top: 8px;
      > .p-checkbox-wrap {
        margin-left: 16px;
        margin-top: 4px;
      }
    }
  }

  .notifications-more {
    @include button($main-black, full);
    margin: 32px 0 16px;
    padding: 0;
  }
}

.notifications-list {
  box-sizing: border-box;
  min-width: 0;
}
.empty {
  @include h4;
  margin: 24px auto;
}

</style>
