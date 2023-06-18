<template>
<div class="p-spinner-wrapper">
  <div class="p-spinner" :style="spinnerStyle" />
</div>
</template>

<script>
export default {
  name: 'p-spinner',
  props: {
    size: {
      type: Number,
      default: 32,
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  computed: {
    spinnerStyle () {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
      };
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-spinner-wrapper {
  display: flex;
  justify-content: center;

  .p-spinner {
    @include spinner;
  }
}
</style>>
