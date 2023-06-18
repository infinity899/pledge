<template>
<div :class="{ header: true, dashboard }">
  <div class="container header-content">
    <Logo />
    <UpDownChevron
      v-if="!dashboard"
      class="header-explore-dropdown"
      :down="dropdownOpened"
      :text="$t('header.explore_projects')"
      @toggle="toggleDropdown(false)"
    />
    <transition name="fade">
      <HeaderCategories
        v-if="dropdownOpened"
        class="dropdown-content"
        :categories="$store.getters.categories"
        :toggleDropdown="toggleDropdown"
      />
    </transition>
    <div v-if="dashboard" class="header-right-first header-dashboard">
      <router-link
        :to="{ name: 'creator-handbook' }"
        :event="''"
        @click.native="showUnimplemented = true"
      >
        {{ $t('header.creator_handbook') }}
      </router-link>
      <router-link
        :to="{ name: 'knowledge-base' }"
        :event="''"
        @click.native="showUnimplemented = true"
      >
        {{ $t('header.knowledge_base') }}
      </router-link>
      <router-link
        :to="{ name: 'creator-forum' }"
        :event="''"
        @click.native="showUnimplemented = true"
      >
        {{ $t('header.creator_forum') }}
      </router-link>
    </div>
    <SearchBar v-else class="header-right-first" @showOverlay="showOverlay = $event" />
    <div v-if="authenticated" class="header-right">
      <div class="notification-menu menu-item" @click="notificationsMenuToggle">
        <img :src="require('@/static/img/icons/ic_notification.svg')">
        <span class="badge" />
        <transition name="fade">
          <NotificationsMenu
            v-if="showNotificationsMenu"
            ref="notificationsMenu"
            class="notification-menu-dropdown-content"
            :user="user"
            @itemClick="showNotificationsMenu = false"
          />
        </transition>
      </div>
      <div class="user-menu menu-item" @click="userMenuClick">
        <Spinner v-if="!$store.getters.isProfileLoaded && $store.getters.profileStatus === 'loading'" :size="40" />
        <span v-else class="user-menu-dropdown-toggle">
          <img class="user-avatar" :src="user | avatar" @click="userMenuToggle">
        </span>
        <transition name="fade">
          <UserMenu
            v-if="showUserMenu"
            ref="userMenu"
            class="user-menu-dropdown-content"
            :user="user"
            @itemClick="showUserMenu = false"
          />
        </transition>
      </div>
      <div class="sidebar-toggle menu-item" @click="sidebarOpened = true">
        <em /><em /><em />
      </div>
      <a v-if="!dashboard" class="start-project menu-item" @click="$emit('showBuilder')">
        {{ $t('header.start_project') }}
      </a>
    </div>
    <div v-if="!authenticated && !hideAuthMenu" id="auth-menu">
      <div class="auth-click" @click="openLoginModal">
        {{ $t('header.signup') }}
      </div>
      <hr class="vertical">
      <div class="auth-click" @click="openSignupModal">
        {{ $t('header.login') }}
      </div>
    </div>
    <div class="header-sidebar" :class="{ opened: sidebarOpened }">
      <div id="sidebar-close" class="sidebar-toggle" @click="sidebarOpened = false">
        <em :style="{transform: 'translate(0px, 7px) rotate(45deg)'}" />
        <em :style="{opacity: 0}" />
        <em :style="{transform: 'translate(0px, -7px) rotate(-45deg)'}" />
      </div>
      <router-link to="/create">
        {{ $t('header.start_project') }}
      </router-link>
      <a href="https://pledgecamp.com">
        {{ $t('header.about') }}
      </a>
    </div>
  </div>
  <AuthModal
    v-if="showAuthModal"
    :isSignup="isSignup"
    @closeModal="showAuthModal = false"
  />
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
  <div v-show="showOverlay" class="overlay" />
</div>
</template>

<script>
import Logo from '@/components/nav/Logo.vue';
import SearchBar from '@/components/nav/SearchBar.vue';
import UserMenu from '@/components/nav/UserMenu.vue';
import NotificationsMenu from '@/components/nav/NotificationsMenu.vue';
import HeaderCategories from '@/components/nav/HeaderCategories.vue';
import AuthModal from '@/components/auth/AuthModal.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';
import UpDownChevron from '@/components/widget/UpDownChevron.vue';
import Spinner from '@/components/widget/Spinner';

export default {
  name: 'pledgecamp-header',
  components: {
    Logo,
    SearchBar,
    UserMenu,
    NotificationsMenu,
    HeaderCategories,
    AuthModal,
    UnimplementedModal,
    UpDownChevron,
    Spinner,
  },
  props: {
    dashboard: Boolean,
  },
  data() {
    return {
      dropdownOpened: false,
      showUserMenu: false,
      showNotificationsMenu: false,
      sidebarOpened: false,
      showAuthModal: false,
      showUnimplemented: false,
      isSignup: false,
      showOverlay: false,
    };
  },
  computed: {
    hideAuthMenu() {
      return (this.$route.name === 'login' || this.$route.name === 'signup');
    },
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.getProfile || {};
    },
  },
  methods: {
    toggleDropdown(unimplemented) {
      this.dropdownOpened = !this.dropdownOpened;
      this.showOverlay = this.dropdownOpened;

      if(this.dropdownOpened) {
        document.addEventListener('keyup', this.escapeListener);
      } else {
        document.removeEventListener('keyup', this.escapeListener);
      }
      this.showUnimplemented = unimplemented;
    },
    escapeListener(event) {
      if(event.keyCode === 27) {
        this.toggleDropdown();
      }
    },
    userMenuClick(e) {
      e.stopPropagation();
    },
    userMenuToggle(e) {
      e.stopPropagation();
      this.showNotificationsMenu = false;
      this.showUserMenu = !this.showUserMenu;
    },
    notificationsMenuToggle(e) {
      e.stopPropagation();
      this.showUserMenu = false;
      this.showNotificationsMenu = !this.showNotificationsMenu;
    },
    documentClick(e) {
      if(e.target !== this.$refs.userMenu) {
        this.showUserMenu = false;
      }
      if(e.target !== this.$refs.notificationsMenu) {
        this.showNotificationsMenu = false;
      }
    },
    openLoginModal() {
      this.isSignup = false;
      this.showAuthModal = true;
    },
    openSignupModal() {
      this.isSignup = true;
      this.showAuthModal = true;
    },
  },
  created() {
    document.addEventListener('click', this.documentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.documentClick);
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
@import 'general.scss';

.header {
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
  position: relative;

  &.dashboard {
    background-color: $blue-light;
  }

  .header-content {
    display: flex;
    height: 90px;
    overflow: visible;

    > * {
      align-self: center;
      &:not(:first-child) {
        margin-left: 20px;
      }
    }

    .header-explore-dropdown {
      z-index: 100;
      margin-top: 6px;
      margin-right: 20px;
    }

    .dropdown-content {
      position: absolute;
      width: 100%;
      z-index: 100;
      top: 0;
      left: 0;
      padding-top: 80px;
      margin-left: 0;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 16px 15px 0 rgba(0, 0, 0, 0.15);
    }

    .header-right-first {
      margin-left: auto;
    }
    .header-dashboard > a {
      @include h5;
      &:not(:last-child) {
        margin-right: 16px;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      margin-left: 24px;

      .menu-item {
        margin-left: 30px;
        cursor: pointer;
      }

      .notification-menu {
        position: relative;

        .badge {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: red;
          border-radius: 50%;
          top: -5px;
          right: 0;
        }

        .notification-menu-dropdown-content {
          position: absolute;
          right: 0;
          margin-top: 20px;
        }
      }
      .user-menu {
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .user-menu-dropdown-content {
          position: absolute;
          right: 0;
          margin-top: 20px;
        }
      }

      .start-project {
        @include button($main-blue, small, secondary);

        @media (max-width: 1120px) {
          display: none;
        }
      }
    }
    #auth-menu {
      display: flex;

      .vertical {
        display: inline-block;
        border-top: none;
        border-bottom: none;
        border-right: none;
        border-left: 1px solid $grey-light;
        margin: 0 20px;
      }
    }
    .header-sidebar {
      position: fixed;
      width: 300px;
      height: 100%;
      right: -310px;
      top: 0;
      background: $white;
      margin: 0;
      padding: 80px 20px 40px 20px;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
      transition: 0.25s ease;
      display: none;
      z-index: 1010;

      &.opened {
        transform: translateX(-310px);
      }
    }

    .sidebar-toggle {
      cursor: pointer;
      display: none;

      em {
        display: block;
        width: 19px;
        height: 2px;
        background: $main-black;
        margin-top: 5px;
        transition: all 0.3s;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    #sidebar-close {
      position: absolute;
      left: 20px;
      top: 20px;
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: 1s;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
}
.auth-click {
  cursor: pointer;
}
.overlay {
  position: fixed;
  width: 100%;
  height: 120%;
  top: -90px;
  left: 0;
  background-color: #fff;
  opacity: 0.9;
  z-index: 10;
}

@media (max-width: $tablet-width-large) {
  .menu-item {
    margin-left: 20px;
  }

  .notification-menu img {
    width: 18px;
    height: 18px;
  }

  .user-menu .user-menu-dropdown-content {
    right: 0;
  }

  .header-explore-dropdown {
    flex-grow: 1;
    text-align: center;
  }

  .overlay { top: 0; }
}

@media (max-width: $tablet-width) {
  .header .header-content {
    justify-content: space-between;

    .header-left-icon {
      display: unset;
    }
    .header-main {
      display: none;
    }
    .header-sidebar {
      display: block;
    }
    .user-menu {
      display: none;
    }
    .header-explore-dropdown {
      display: none;
    }
    .sidebar-toggle {
      display: block;
    }
    #auth-menu {
      display: none;
    }
    .header-right {
      margin-left: 0;

      > div {
        width: 18px;
        height: 18px;
      }
    }
  }
}

@media (max-width: $mobile-width) {
  .header .header-content .dropdown-content {
    background-color: transparent;
  }
}
</style>
