<template>
<div v-if="mounted && project" class="updates-content">
  <div class="updates-main">
    <div class="updates-header">
      <div>{{ $t('manager.updates.title') }}</div>
      <div
        v-if="updates.length"
        class="new-update"
        @click="handleNewUpdateClick"
      >
        {{ $t('manager.updates.new') }}
      </div>
    </div>
    <div
      v-if="updates.length"
      class="updates-list"
    >
      <UpdateItem
        v-for="(update, index) in updates"
        :key="update.id"
        v-model="updates[index]"
        :idx="index"
        :total="updates.length - 1"
        @open="handleUpdateClick($event)"
      />
    </div>
    <UpdatesEmpty
      v-if="mounted && !updates.length"
      @newUpdate="handleNewUpdateClick"
    />
  </div>
  <div class="updates-sidebar">
    <UpdatesWhy />
  </div>
  <UpdateModal
    v-if="modalOpen"
    :update="selectedUpdate"
    @close="handleClose"
    @refreshAllUpdates="getProjectUpdates"
  />
</div>
</template>

<script>
import UpdatesEmpty from '@/components/manager/UpdatesEmpty.vue';
import UpdatesWhy from '@/components/manager/UpdatesWhy.vue';
import UpdateItem from '@/components/manager/UpdateItem.vue';
import UpdateModal from '@/components/manager/UpdateModal.vue';
import { getCreatorProjectDetail } from '@/utils/api';

export default {
  name: 'manager-updates',
  components: {
    UpdatesEmpty,
    UpdatesWhy,
    UpdateItem,
    UpdateModal,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      modalOpen: false,
      updates: [],
      selectedUpdate: null,
      mounted: false,
    };
  },
  watch: {
    project(val) {
      if(val && val.updates) {
        this.updates = val.updates;
      }
    },
  },
  methods: {
    handleNewUpdateClick() {
      this.modalOpen = true;
    },
    handleClose() {
      this.modalOpen = false;
      this.selectedUpdate = null;
    },
    handleUpdateClick(update) {
      this.selectedUpdate = update;
      this.modalOpen = true;
    },
    async getProjectUpdates() {
      const project = await getCreatorProjectDetail(this.$route.params.id);
      const { updates } = project;
      this.updates = updates || [];
    },
  },
  async mounted() {
    await this.getProjectUpdates();
    this.mounted = true;
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.updates-content {
  min-height: 400px;
  display: flex;
  flex-direction: row;

  .updates-main {
    width: 65%;
    display: flex;
    flex-direction: column;
    min-width: 510px;

    .updates-header {
      @include h3;
      margin-bottom: 10px;
      padding: 5px 0;
      width: 95%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .new-update {
        @include button($main-black, small);
      }
    }

    .updates-list {
      width: 95%;
      margin: 10px 10px 10px 0;
      display: flex;
      flex-direction: column;
    }

    .updates-wrap {
      width: 100%;
      border: 1px solid red;
    }
  }

  .updates-sidebar {
    width: 35%;
  }

  @media (max-width: $tablet-width-large) {
    flex-wrap: wrap;
    .updates-main, .updates-sidebar {
      width: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: $tablet-width-large) {
    .updates-main {
      min-width: unset;
      .updates-list {
        margin-right: 0;
        width: 100%;
      }
    }
  }
}

</style>
