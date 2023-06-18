<template>
<div class="avatar">
  <div class="avatar-img" :style="{ backgroundImage: `url(${avatar})` }">
    <router-link :to="{ name: 'user-public', params: {id: user.id}}" />
  </div>
  <div v-if="tags.length" class="avatar-tags">
    <div
      v-for="(t, index) in tags"
      :key="index"
      class="avatar-tags-item"
    >
      {{ t }}
    </div>
  </div>
  <div v-else-if="tag" class="avatar-tags">
    <div class="avatar-tags-item">
      {{ tag }}
    </div>
  </div>
  <div v-else-if="isCreator" class="avatar-tags">
    <div class="avatar-tags-item">
      {{ $t('widgets.avatar.creator') }}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    user: {
      type: Object,
      default: null,
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    tag: {
      type: String,
      default: null,
    },
    isCreator: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    avatar() {
      return this.$options.filters.avatar(this.user);
    },
  },
};
</script>

<style lang="scss">
.avatar {
  display: inline-block;

  .avatar-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    > a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .avatar-tags {
    margin-top: 8px;
    .avatar-tags--item {
      padding: 4px 5px;
      background: #37a299;
      color: white;
      font-family: $font-normal;
      font-weight: 700;
      line-height: 12px;
      font-size: 10px;
      text-align: center;
      margin-bottom: 5px;
    }
  }
}
</style>

