<template>
<div
  class="p-sticky"
  :style="{ top: `${top}px` }"
>
  <slot />
</div>
</template>

<script>
/**
 * Parent element is automatically recognized as sticky container
 * Please make sure this sticky component is the first level child of sticky container
 */
export default {
  name: 'p-sticky',
  props: {
    top: { // sticky y-position in pixels
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss">
.p-sticky {
  position: sticky;
  z-index: 1001;
  top: 0;
}
</style>
