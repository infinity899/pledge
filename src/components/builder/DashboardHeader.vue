<template>
<div class="dashboard-header container">
  <div class="dashboard-header-left">
    <Logo :showLabel="false" />
    <router-link :to="{ name: 'dashboard' }">
      <Arrow color="#2e40ea" :back="true" />
      <span>{{ $t('dashboard.back') }}</span>
    </router-link>
  </div>
  <TabBar
    v-if="showTabs"
    :tabs="tabs"
    :activeTab="activeTab"
    :onChangeTab="setTab"
  />
  <div class="dashboard-header-right">
    <div v-if="saveStatus === 'saving'" class="dashboard-save">
      {{ $t('dashboard.saving') }}
    </div>
    <div v-else-if="saveStatus === 'saved'" class="dashboard-save">
      {{ $t('dashboard.saved') }}
    </div>
    <div class="dashboard-preview">
      {{ $t('dashboard.header_preview') }}
    </div>
  </div>
</div>
</template>

<script>
import Logo from '@/components/nav/Logo.vue';
import Arrow from '@/components/svg/Arrow.vue';
import TabBar from '@/components/widget/TabBar.vue';

export default {
  name: 'dashboard-header',
  components: {
    Logo,
    Arrow,
    TabBar,
  },
  props: {
    tab: {
      type: String,
      default: null,
    },
    saveStatus: {
      type: String,
      default: null,
    },
    showTabs: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showUnimplemented: false,
    };
  },
  computed: {
    activeTab() {
      return this.tabs.find(t => t.label === this.tab) || this.tabs[0];
    },
    tabs() {
      return [
        {
          label: this.$t('dashboard.basics.title'),
          page: 'dashboard-basics',
        },
        {
          label: this.$t('dashboard.overview.title'),
          page: 'dashboard-overview',
        },
        {
          label: this.$t('dashboard.rewards.title'),
          page: 'dashboard-rewards',
        },
        {
          label: this.$t('dashboard.timeline.title'),
          page: 'dashboard-timeline',
        },
        {
          label: this.$t('dashboard.account.title'),
          page: 'dashboard-account',
        },
      ];
    },
  },
  methods: {
    setTab(tab) {
      this.$router.push({ name: tab.page });
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px 0;

  .dashboard-header-left {
    @include button_small_text;
    display: flex;
    align-items: center;
    height: 100%;
    a {
      margin-left: 64px;
      color: $main-blue;
    }
    a:hover {
      outline: none;
    }
    svg {
      margin-right: 8px;
    }
  }
  .tab-bar .tab-bar-menu {
    min-width: 120px;
  }
  .dashboard-header-right {
    display: flex;
    margin-right: 32px;
    align-items: center;
    min-width: 200px;
    justify-content: flex-end;
    .dashboard-save {
      @include subheading;
      color: $grey50;
      margin-right: 16px;
      min-width: 60px;
    }
    .dashboard-preview {
      @include button($main-blue, small, secondary);
    }
  }
  @media (max-width: $tablet-width) {
    .dashboard-header-left {
      a {
        margin-left: 8px;
      }
    }
  }
  @media (max-width: $mobile-width) {
    justify-content: unset;
    .dashboard-header-left {
      .p-logo-wrap {
        display: none;
      }
      a {
        margin: 0 8px 0 0;
        span {
          display: none;
        }
      }
    }
    .dashboard-header-right {
      min-width: 0;
      margin-left: auto;
      .dashboard-preview {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  }
}
</style>
