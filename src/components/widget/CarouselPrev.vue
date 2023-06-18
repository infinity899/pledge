<template>
<button
  class="btn-prev"
  :disabled="disabled"
  @click="$emit('click')"
>
  <svg width="10" height="16" viewBox="0 0 10 16">
    <path d="M9.60376 14.8527L8.55213 15.9223L0.934912 8.43313L8.55213 0.943939L9.60376 2.01355L3.07444 8.43313L9.60376 14.8527Z" fill="black" />
  </svg>
</button>
</template>

<script>

export default {
  name: 'carousel-prev',
  props: {
    disabled: Boolean,
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.btn-prev {
  @include icon-button;
}
</style>
