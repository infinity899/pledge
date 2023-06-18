<template>
<div class="p-progressbar">
  <div
    class="progress-line"
    :style="{ width: `${calculatedPercent}%`, height: `${height}px` }"
  >
    <div v-if="showTooltip" class="progress-tooltip">
      <span class="percent-value">{{ Math.round(percent) }}</span>
      <!-- eslint-disable vue-i18n/no-raw-text -->
      <span class="percent-label">%</span>
      <!-- eslint-enable vue-i18n/no-raw-text -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'p-progressbar',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 4, // progress bar height in pixels
    },
  },
  computed: {
    calculatedPercent() {
      return Math.min(100, this.percent);
    },
  },
};
</script>

<style lang="scss">
.p-progressbar {
  width: 100%;
  background-color: $blue-med;

  .progress-line {
    position: relative;
    background-color: $main-blue;
    height: 4px;
    transition: width 0.2s ease-in-out;
  }

  .progress-tooltip {
    position: absolute;
    top: -40px;
    right: 0;
    transform: translateX(50%);
    min-width: 50px;
    text-align: center;
    padding: 7px 7px 2px;
    background: $white;
    border: 1px solid rgba(151, 151, 151, 0.15);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    line-height: 1;
    color: $main-black;
    font-family: $font-title;
    font-weight: 700;
    font-size: 19px;

    .percent-label {
      font-size: 12px;
    }

    &::after {
      position: absolute;
      content: ' ';
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid $white;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

