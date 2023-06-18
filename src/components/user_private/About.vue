<template>
<div v-if="profile" class="user-about">
  <div class="user-about-wrap user-avatar-wrap">
    <div :style="{ 'background-image': `url(${$options.filters.avatar(profile)})` }" />
  </div>
  <div class="user-about-wrap">
    <div class="user-info-name">
      <h2>
        {{ profile.name || 'Anonymous' }}
      </h2>
      <div class="user-edit-cta" @click="showModal = true">
        {{ $t('user.private.edit.title') }}
      </div>
    </div>
    <div class="user-info-header">
      <div v-if="profile.location" class="user-info-header-item user-info-address">
        <img :src="require('@/static/img/icons/ic_map_pin.svg')">
        <div>
          {{ profile.location }}
        </div>
      </div>
      <div class="user-info-header-item">
        <Edit />
        <div>
          {{ $tc('user.private.campaigns', projectCount).toUpperCase() }}
        </div>
      </div>
      <div class="user-info-header-item">
        <img :src="require('@/static/img/icons/ic_heart.svg')">
        <span>
          {{ $tc('user.private.backed', pledgedProjectCount).toUpperCase() }}
        </span>
      </div>
    </div>
    <div class="user-info-bio">
      {{ profile.bio || $t('user.private.bio_false') }}
    </div>
    <h5 v-if="profile.website">
      {{ profile.website }}
    </h5>
    <div class="user-info-join">
      {{ camperJoined }}
    </div>
  </div>
  <EditModal
    v-if="showModal"
    :profile="profile"
    @hideModal="showModal = false"
    @updatedProfile="getUserProfile"
  />
</div>
</template>

<script>
import moment from 'moment';
import EditModal from '@/components/user_private/EditModal.vue';
import Edit from '@/components/svg/Edit.vue';

export default {
  name: 'about',
  components: {
    EditModal,
    Edit,
  },
  props: {
    profile: {
      type: Object,
      default: null,
    },
    getUserProfile: {
      type: Function,
      default: () => {},
    },
    backedCount: {
      type: Number,
      default: 0,
    },
    campaignsCount: {
      type: Number,
      default: 0,
    },
    pledgedProjectCount: {
      type: Number,
      default: 0,
    },
    projectCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    camperJoined() {
      return `${this.$t('user.private.joined')} ${moment(this.profile.joined).fromNow()}`;
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "general.scss";
@import "widgets.scss";

.user-about {
  padding-top: 50px;
  display: flex;
  color: $main-black;

  @media (max-width: $tablet-width-large) {
    flex-direction: column;
    align-items: center;
  }

  .user-info-bio {
    margin-bottom: 34px;
  }

  .user-about-wrap {
    margin: 0 80px;

    @media (max-width: $tablet-width-large) {
      margin: 0 0 34px 0;
    }
  }

  .user-info-join {
    @include h5;
    color: $grey70;
  }

  .user-avatar-wrap {
    width: 297px;
    height: 297px;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    div {
      background-size: contain;
      width: 100%;
      height: 100%;
    }
  }

  .user-info-name {
    display: flex;
    align-items: baseline;

    .user-edit-cta {
      @include link;
      margin-left: 55px;
    }
  }

  .user-info-header {
    @include h5;
    margin-bottom: 30px;
    margin-top: 16px;
    color: $grey50;
    display: flex;

    .user-info-header-item {
      display: flex;
      align-items: center;
      &:not(:last-of-type) {
        margin-right: 24px;
      }
      img,svg {
        margin-right: 6px;
      }
    }
  }
}
</style>

