<template>
<ul class="p-stepper">
  <li
    v-for="(step, index) in steps"
    :key="index"
    class="p-stepper-step"
    :class="{
      active: index === currentStep,
      'p-stepper-prev': index < currentStep,
      'p-stepper-next': index > currentStep,
    }"
  >
    <span @click="onStep(index)">{{ step }}</span>
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.67426 5.2348L0.20459 1.76513L1.26525 0.704468L5.79558 5.2348L1.26525 9.76513L0.20459 8.70447L3.67426 5.2348Z" />
    </svg>
  </li>
</ul>
</template>

<script>
export default {
  name: 'p-stepper',
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    onStep: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.p-stepper {
  margin: 24px 0 48px;
  .p-stepper-step {
    @include subheading;
    color: $grey2;
    text-transform: uppercase;
    display: inline-block;
    margin-right: 12px;
    cursor: default;
    > svg {
      margin-left: 12px;
      fill: $grey;
    }
    &:last-child > svg {
      display: none;
    }
    &.active {
      color: $main-black;
      > svg {
        fill: $main-black;
      }
    }
  }
}
</style>
