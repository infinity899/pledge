<template>
<div v-if="profile" class="user-about">
  <div class="user-about-wrap user-avatar-wrap">
    <div :style="{ 'background-image': `url(${$options.filters.avatar(profile)})` }" />
  </div>
  <div class="user-about-wrap">
    <h2>
      {{ profile.name || 'Anonymous' }}
    </h2>
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
          {{ projectCount }}
          {{ $t('user.public.campaigns') }}
        </div>
      </div>
      <div class="user-info-header-item">
        <img :src="require('@/static/img/icons/ic_heart.svg')">
        <div>
          {{ pledgedProjectCount }}
          {{ $t('user.public.backed') }}
        </div>
      </div>
    </div>
    <div class="user-info-bio">
      {{ profile.bio || $t('user.public.bio_false') }}
    </div>
    <h5 v-if="profile.website">
      {{ profile.website }}
    </h5>
    <div class="user-info-join">
      {{ camperJoined }}
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import Edit from '@/components/svg/Edit.vue';

export default {
  name: 'about',
  components: {
    Edit,
  },
  props: {
    profile: {
      type: Object,
      default: null,
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
  computed: {
    camperJoined() {
      return `${this.$t('user.public.joined')} ${moment(this.profile.joined).fromNow()}`;
    },
  },
};
</script>
