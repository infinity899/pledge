<template>
<div class="date-range-select">
  <div
    v-for="range in ranges"
    :key="range"
    :class="{ selected: range === selectedRange }"
    @click="selectedRange = range; onChange(range);"
  >
    {{ range }}
  </div>
</div>
</template>

<script>
export default {
  name: 'date-range-select',
  props: {
    defaultRange: {
      type: String,
      default: '1d',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      ranges: ['1d', '1w', '1m', '1y', 'All'],
      selectedRange: '1d',
    };
  },
  created() {
    this.selectedRange = this.defaultRange;
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.date-range-select {
  display: flex;

  & > div {
    @include h5;
    color: $grey50;
    height: 32px;
    position: relative;
    cursor: pointer;
  }

  & > div + div {
    margin-left: 16px;
  }

  .selected {
    color: $main-black;

    &::after {
      content: '';
      height: 3px;
      width: 21px;
      background-color: $main-orange;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
