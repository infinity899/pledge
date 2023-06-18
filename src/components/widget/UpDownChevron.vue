<template>
<div :class="{ down }" class="chevron">
  <a class="chevron-toggle" @click="$emit('toggle', !down)">
    <span v-if="text">{{ text }}</span>
    <img :src="require('@/static/img/icons/ic_arrow_down.svg')">
  </a>
</div>
</template>

<script>
export default {
  name: 'up-down-chevron',
  props: {
    down: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.chevron {
  .chevron-toggle {
    @include subtitle;
    cursor: pointer;

    span {
      margin-right: 10px;
    }
    img {
      transition: transform 0.2s ease-in-out;
      position: relative;
      top: -1px;
    }
  }

  &.down {
    .chevron-toggle img {
      transform: rotate(180deg);
    }
  }
}
</style>
