<template>
<div class="container">
  <div class="project-update">
    <div v-if="!updates" class="project-update-none">
      {{ $t('project.updates.no_updates') }}
    </div>
    <div v-else class="updates">
      <UpdateSidebar
        :class="{ sidebar: true, hide: showDetailView }"
        :updates="updates"
        :onSelect="onSelectUpdate"
        :toggleDetailView="toggleDetailView"
        :selected="selected"
      />
      <UpdateContent
        :class="{ content: true, hide: !showDetailView }"
        :update="selectedUpdate"
        :toggleDetailView="toggleDetailView"
      />
      <h4 v-if="projectUpdates.length === 0">
        {{ $t('project.updates.no_creator_updates') }}
      </h4>
    </div>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';
import { getProjectUpdate } from '@/utils/api';
import UpdateSidebar from '@/components/project/UpdateSidebar.vue';
import UpdateContent from '@/components/project/UpdateContent.vue';

export default {
  name: 'project-updates',
  components: {
    UpdateContent,
    UpdateSidebar,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      selected: 0,
      selectedUpdateFull: null,
      showDetailView: false,
    };
  },
  computed: {
    projectUpdates() {
      if(!this.project) {
        return [];
      }
      return this.project.updates || [];
    },
    updates() {
      if(!this.project) {
        return [];
      }
      const updates = this.projectUpdates.map((u, index) => (
        { index, ...u }
      ));

      if(this.launched) {
        updates.push({
          date: this.project.start_time,
          name: 'Project Launched',
          index: -1,
        });
      }
      if(this.funded) {
        updates.push({
          date: this.project.end_time,
          name: 'Project Funded',
          index: -1,
        });
      }
      updates.sort((a, b) => a.date - b.date);
      updates.forEach((u) => { u.date = u.date.format('DD MMM YYYY') });
      return updates;
    },
    selectedUpdate() {
      if(this.selected === -1) {
        return {};
      }
      return this.selectedUpdateFull
        || this.updates.find(u => u.index === this.selected) || {};
    },
    launched() {
      if(!this.project) {
        return {};
      }
      const now = moment();
      return now > this.project.start_time;
    },
    funded() {
      if(!this.project) {
        return {};
      }
      return this.project.total_pledged > this.project.funding_goal;
    },
  },
  methods: {
    onSelectUpdate(index) {
      if(this.project.updates.length > 0) {
        this.selectedUpdateFull = null;
        this.selected = index;
        getProjectUpdate({
          projectId: this.project.id,
          updateId: this.selectedUpdate.id,
        })
          .then((res) => {
            this.selectedUpdateFull = res.data.update;
          });
      }
    },
    toggleDetailView() {
      this.showDetailView = !this.showDetailView;
    },
  },
  mounted() {
    this.onSelectUpdate(this.selected);
  },
};
</script>

<style lang="scss">
@import "general.scss";

.project-update {
  padding: 70px 70px;
  min-height: 400px;

  .project-update-none {
    font-size: 2em;
    margin-top: 48px;
  }
  .updates {
    display: flex;

    .sidebar {
      flex-basis: 40%;
      display: block;
    }
    .content {
      display: block;
    }
  }
  @media (max-width: $tablet-width) {
    padding: 70px 0;
  }

  @media (max-width: $mobile-width) {
    .updates {
      padding-top: 25px;
      .content.hide {
        display: none;
      }
      .sidebar {
        flex-basis: 100%;
        &.hide {
          display: none;
        }
      }
    }
  }
}

</style>
