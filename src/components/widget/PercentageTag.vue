<template>
<div class="percentage-tag" :class="{small}">
  <img :src="require('@/static/img/icons/ic_lightning.svg')">
  <div v-if="message" class="tag-label">
    {{ message }}
  </div>
</div>
</template>

<script>
export default {
  name: 'percentage-tag',
  props: {
    message: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.percentage-tag {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: $white;
  padding: 4px 8px;
  border-radius: 16px;
  position: absolute;

  .tag-label {
    font-family: $font-title;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    text-transform: capitalize;
    margin-left: 4px;
  }

  &.small {
    border-radius: 0;
    border-bottom-right-radius: 7px;
    padding: 3px;

    img {
      width: 9px;
      height: 10px;
    }

    .tag-label { font-size: 9px; }
  }
}
</style>
