<template>
<div class="manager-wrap">
  <div class="container-content">
    <div v-if="project" class="manager-header">
      <div class="header-main">
        <div class="project-name-wrap">
          <div class="project-name">
            {{ project.name }}
          </div>
          <div class="project-creator">
            <div class="header-creator-icon" />
            <div class="header-creator-name">
              {{ creator }}
            </div>
            <div class="header-creator-manage" @click="onManageClick">
              {{ $t('manager.manage') }}
            </div>
          </div>
        </div>
        <div class="project-status-wrap">
          <div class="project-status">
            {{ statuses[status] }}
          </div>
          <router-link
            class="view-project"
            :to="{name: 'project', params: {id: project.id, tab: 'campaign'}}"
            target="_blank"
          >
            {{ $t('manager.view') }}
          </router-link>
        </div>
      </div>
      <div class="manager-menu">
        <TabBar
          :cls="'tab-border'"
          :tabs="$t('manager.tabs')"
          :activeTab="activeTab"
          :onChangeTab="setTab"
        >
          <template v-slot:right>
            <div class="tab-bar-menu-item project-edit">
              {{ $t('manager.edit') }}
            </div>
          </template>
        </TabBar>
      </div>
    </div>
    <keep-alive>
      <component
        :is="activeTab.component"
        :project="project"
        :status="status"
      />
    </keep-alive>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';
import find from 'lodash.find';

import Insights from '@/components/manager/Insights.vue';
import Backers from '@/components/manager/Backers.vue';
import Updates from '@/components/manager/Updates.vue';
import Shipping from '@/components/manager/Shipping.vue';
import Timeline from '@/components/manager/Timeline.vue';
import TabBar from '@/components/widget/TabBar.vue';
import * as api from '@/utils/api';

export default {
  name: 'project_manager',
  components: {
    TabBar,
    Insights,
    Backers,
    Updates,
    Shipping,
    Timeline,
  },
  data() {
    return {
      activeTab: null,
      project: null,
      statuses: {
        open: 'Funding Open',
        progress: 'In Progress',
        complete: 'Project Complete',
      },
    };
  },
  computed: {
    creator() {
      return this.project ? this.project.creator.name : '';
    },
    status() {
      if(!this.project) {
        return '';
      }
      // "Funding Open" means the current time is between start_time` and `end_time`
      // "In Progress" means the current time is after `end_time` and before the last milestone time
      const today = moment();
      const start = this.project.start_time;
      const end = this.project.end_time;
      if(start.isBefore(today) && end.isAfter(today)) {
        return 'open';
      }
      const last = this.getLastMilestone();
      if(end.isBefore(today) && (!last || today.isBefore(moment(last)))) {
        return 'progress';
      }
      return 'complete'; // TODO: or whatever status applies if the prev two dont
    },
  },
  methods: {
    setTab(tab, hash = '', query = '') {
      const { id } = this.$route.params;
      this.$router.replace({ path: `/manager/${id}/${tab.label.toLowerCase()}`, hash, query });
      this.activeTab = tab;
    },
    tabFromName(name) {
      const tabs = this.$t('manager.tabs');
      for(let i = 0; i < tabs.length; i += 1) {
        if(tabs[i].label.toLowerCase() === name.toLowerCase()) {
          return tabs[i];
        }
      }
      return tabs[0];
    },
    getLastMilestone() {
      const { milestones } = this.project;
      if(!milestones.length) return null;
      const sorted = milestones.slice().sort((m1, m2) => m2.date - m1.date);
      // TODO: double check to make sure this sorts by latest date first
      return sorted[0].date;
    },
    onChangeTab(label) {
      if(this.activeTab.label !== label) {
        const tabs = this.$t('manager.tabs');
        const t = find(tabs, tab => tab.label === label);
        this.setTab(t);
      }
    },
    onManageClick() {
    },
  },
  created() {
    const tabTitle = this.$route.params.tab || 'insights';
    this.setTab(this.tabFromName(tabTitle));
  },
  async mounted() {
    this.project = await api.getCreatorProjectDetail(this.$route.params.id);
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.manager-wrap {
  overflow: visible;
  .manager-header {
    .header-main {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      margin: 50px 0 15px;
      .project-name-wrap {
        .project-name {
          @include h1;
        }
        display: flex;
        flex-direction: column;
        font-size: 12px;
        max-width: 50%;
        min-width: 270px;
        .project-creator {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 8px;
          @include subheading;
          .header-creator-icon {
            width: 25px;
            height: 25px;
            background-color: black;
            border-radius: 50%;
            margin-right: 6px;
          }
          .header-creator-name {
            color: $main-black;
            margin-right: 24px;
            padding-top: 3px;
          }
          .header-creator-manage {
            @include button_small_text;
            color: $main-blue;
            cursor: pointer;
            padding-top: 5px;
          }
        }
      }
      .project-status-wrap {
        display: flex;
        flex-direction: row;
        @include h4;

        .project-status {
          align-self: center;
          color: gray;
          margin: 0 15px;
        }
        .view-project {
          color: $main-blue;
          background-color: $blue-med;
          font-size: 14px;
          cursor: pointer;
          padding: 10px 16px 6px;
          align-self: center;
        }
      }
    }
  }
  .manager-menu {
    display: flex;
    margin: 60px 0;
    border-bottom: 1px solid $border-light;
  }
  .tab-bar-wrap {
    width: 100%;
  }
  .tab-bar-right {
    color: $main-blue;
    cursor: pointer;
    text-align: right;
  }
  .tab-border {
    border-bottom: 1px solid $border-light;
  }
  .project-edit {
    color: $main-blue;
    font-weight: 700;
  }
  @media (min-width: 599px) {
    .manager-menu .multiselect {
      display: none;
    }
  }
  @media (max-width: $tablet-width) {
    .manager-header .header-main .project-status-wrap {
      flex-direction: column;
      justify-content: flex-end;
      .project-status {
        margin-right: unset;
      }
      .view-project {
        margin-top: 12px;
        align-self: flex-end;
      }
    }
  }
  @media (max-width: $mobile-width) {
    .manager-header .header-main {
      flex-direction: column;
      justify-content: flex-start;
      .project-name-wrap {
        max-width: 100%;
      }
      .project-status-wrap {
        align-self: flex-start;
        margin-top: 32px;
        .project-status {
          margin: 0;
        }
      }
    }
  }
}
</style>
