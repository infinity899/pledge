<template>
<div class="user-menu-wrap">
  <div class="user-projects">
    <div class="created">
      <span class="label">{{ $t('header.userMenu.created_projects') }}</span>
      <div v-if="!user.latest_created_projects">
        {{ $t('header.userMenu.no_created_projects') }}
      </div>
      <ul v-else class="created-project-list">
        <li
          v-for="project in user.latest_created_projects"
          :key="project.id"
          class="created-project-item"
        >
          <img class="p-image" :src="project.main_image.url">
          <div class="p-info">
            <div class="p-title">
              {{ project.name }}
            </div>
            <router-link
              class="p-url"
              :to="{name: 'dashboard', params: {id: project.id, tab: 'campaign'}}"
              @click.native="$emit('itemClick')"
            >
              {{ $t('header.userMenu.project_dashboard') }}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <hr>
    <div class="backed">
      <span class="label">
        {{ $tc('header.userMenu.backed_projects', user.backed_projects_count || 0) }}
      </span>
      <div v-if="!user.latest_backed_projects">
        {{ $t('header.userMenu.no_backed_projects') }}
      </div>
      <ul v-else class="backed-project-list">
        <li
          v-for="project in user.latest_backed_projects"
          :key="project.id"
          class="backed-project-item"
        >
          <router-link
            class="view-project"
            :to="{name: 'project', params: {id: project.id, tab: 'campaign'}}"
            target="_blank"
            @click.native="$emit('itemClick')"
          >
            {{ project.name }}
          </router-link>
        </li>
        <li class="backed-project-item view-all-link">
          <router-link :to="{name: 'user' }" @click.native="$emit('itemClick')">
            {{ $t('header.userMenu.view_all') }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="user-account">
    <div class="links-menu">
      <span class="label">{{ $t('header.userMenu.account') }}</span>
      <div class="links-menu-items">
        <router-link
          v-for="(link, index) in $t('header.userMenu.userLinks')"
          :key="index"
          class="links-menu-item"
          :to="{ name: link.route }"
          @click.native="$emit('itemClick')"
        >
          {{ link.title }}
        </router-link>
        <a class="links-menu-item" href="#" @click="logout">
          {{ $t('logout') }}
        </a>
      </div>
    </div>
    <router-link :to="{name: 'wallet' }" @click.native="$emit('itemClick')">
      <div class="wallet">
        <span class="w-label">{{ $t('header.userMenu.wallet') }}</span>
        <span class="w-value">{{ $t('header.userMenu.wallet_placeholder') }}</span>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import { USER_TOKEN_KEY } from '@/utils/api';

export default {
  name: 'user-menu',
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  methods: {
    async logout(e) {
      e.preventDefault();
      localStorage.removeItem(USER_TOKEN_KEY);
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.user-menu-wrap {
  display: flex;
  overflow: hidden;
  border-radius: 1px;
  background-color: $white;
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.15);
  font-family: $font-title;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: $main-black;
  cursor: initial;

  .label {
    margin-bottom: 15px;
    display: inline-block;
    color: rgba(0, 0, 0, 0.5);
  }

  .user-projects {
    padding: 32px 32px 24px 40px;
    min-width: 355px;
    display: block;

    .created, .backed {
      min-height: 100px;
    }

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

  .user-account {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $bg-grey-light;
    padding: 32px 40px 24px;
    min-width: 230px;

    .links-menu-items {
      display: flex;
      flex-direction: column;

      a.links-menu-item {
        @include h5;
        margin-bottom: 8px;
      }
    }

    .wallet {
      display: flex;
      margin-top: 30px;
      margin-left: -10px;
      margin-right: -10px;
      width: 100%;
      padding: 16px 15px 11px 15px;
      background: $white;
      border: 2px solid $border-light;
      justify-content: space-between;
      min-width: 184px;

      .w-label {
        color: $main-blue;
      }

      .w-value {
        color: $grey;
      }
    }
  }
}
</style>
