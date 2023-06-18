<template>
<button
  class="btn-next"
  :disabled="disabled"
  @click="$emit('click')"
>
  <svg width="10" height="16" viewBox="0 0 10 16">
    <path d="M0.934814 14.8527L1.98645 15.9223L9.60366 8.43313L1.98645 0.943939L0.934814 2.01355L7.46413 8.43313L0.934814 14.8527Z" fill="black" />
  </svg>
</button>
</template>

<script>

export default {
  name: 'carousel-next',
  props: {
    disabled: Boolean,
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.btn-next {
  @include icon-button;
}
</style>
