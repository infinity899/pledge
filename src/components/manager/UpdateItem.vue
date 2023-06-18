<template>
<div v-if="update" class="update-item" @click="$emit('open', update)">
  <div class="bullet-wrap">
    <div
      class="bullet-line"
      :class="{ 'first': idx === 0, 'last': idx === total, 'only': idx === total && idx === 0 }"
    />
    <div class="bullet">
      <Bullet :color="update.draft ? '#000' : '#2E40EA'" />
    </div>
  </div>
  <div
    class="main"
    :class="{ 'draft-main': update.draft }"
  >
    <div
      v-if="update.draft"
      class="draft"
    >
      <span>{{ $t('manager.updates.draft') }}</span>
      <span>{{ `${$t('manager.updates.last')} ${getLastUpdated()}` }}</span>
    </div>
    <div class="header">
      <div class="name">
        {{ update.name }}
      </div>
      <div
        v-if="!update.draft"
        class="date"
      >
        {{ getDate(update.date) }}
      </div>
    </div>
    <div class="description">
      {{ getTruncatedDescription(update) }}
    </div>
    <div
      v-if="!update.draft"
      class="likes"
    >
      <!-- TODO: this is hardcoded till backend functionality is added -->
      <div>{{ $tc('manager.updates.likes', 2) }}</div>
      <div>{{ $tc('manager.updates.comments', 3) }}</div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';

import Bullet from '@/components/svg/Bullet.vue';
import { getProjectUpdate } from '@/utils/api';

export default {
  name: 'update-item',
  components: {
    Bullet,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    idx: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      update: null,
    };
  },
  methods: {
    getDate(date) {
      return moment(date).format('MMM DD');
    },
    getLastUpdated() {
      return 'yesterday'; // TODO: hardcoded till backend functionality is added
    },
    getTruncatedDescription(update) {
      if(update.description) {
        return update.description.slice(0, 120);
      }
      return '';
    },
    async getProjectUpdate() {
      const { data: { update } } = await getProjectUpdate({
        updateId: this.value.id,
        projectId: this.$route.params.id,
      });
      this.update = update;
    },
  },
  mounted() {
    this.getProjectUpdate();
    this.$root.$on('refreshUpdate', (id) => {
      if(this.update.id === id) {
        this.getProjectUpdate();
      }
    });
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.update-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;

  .bullet-wrap {
    position: relative;
    margin-left: 15px;

    .bullet-line {
      width: 10px;
      position: absolute;
      top: 0;
      bottom: 0;
      border-left: 1px solid $border-light;

      &.first {
        top: 40px;
      }
      &.last {
        bottom: calc(100% - 35px);
      }
      &.only {
        display: none;
      }
    }

    .bullet {
      position: absolute;
      top: 30px;
      margin-left: -8px;
    }
  }

  .main {
    width: calc(100% - 45px);
    padding-top: 25px;
    margin-left: 30px;
    margin-bottom: 20px;
    border: 1px solid $border-light;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &.draft-main {
      background-color: #f0f0f2; // TODO: add to globals file (it's from the Sketch file)
    }

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease;
    }

    .draft {
      @include h5;
      padding: 0 20px 12px;

      > span {
        &:first-child {
          color: $main-orange;
          margin-right: 20px;
        }
        &:last-child {
          opacity: 0.5;
        }
      }
    }

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 0 20px;

      .name {
        @include h4;
      }

      .date {
        @include h5;
        opacity: 0.5;
      }
    }
  }

  .likes {
    @include h5;
    display: flex;
    flex-direction: row;
    opacity: 0.5;
    background-color: $bg-grey-light;
    padding: 20px 20px;

    > div:first-child {
      margin-right: 15px;
    }
  }

  .description {
    @include p_small;
    margin-bottom: 16px;
    padding: 0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: $tablet-width) {
    .bullet-wrap {
      display: none;
    }
    .main {
      margin-left: 0;
      width: 100%;
    }
  }
}
</style>
