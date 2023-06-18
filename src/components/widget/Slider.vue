<template>
<div class="slider">
  <input
    class="slider-input"
    type="range"
    :value="slideValue"
    min="0"
    max="100"
    @input="handleInput"
  >
</div>
</template>

<script>
export default {
  name: 'p-slider',
  props: {
    slideValue: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleInput(ev) {
      const val = ev.target.value;
      const els = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
      els.forEach((el) => {
        try {
          document.styleSheets[0].addRule(
            `input::-${el}`,
            `background: linear-gradient(to right, #2e40ea 0%, #2e40ea ${val}%, #c8c8cb ${val}%, #c8c8cb 100%)`,
          );
        } catch(err) {} // eslint-disable-line
      });
      this.$emit('input', val);
    },
  },
  mounted() {
    const els = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
    els.forEach((el) => {
      try {
        document.styleSheets[0].addRule(
          `input::-${el}`,
          'background: #c8c8cb',
        );
      } catch(err) {} // eslint-disable-line
    });
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.slider {
  width: 100%;
  margin: 20px 0;
}
.slider-input {
  -webkit-appearance: none;
  width: 100%;
  height: 0;
  border-radius: 5px;
  border-color: $border-light;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;

  @mixin sliderThumb {
    width: 20px;
    height: 20px;
    margin: -9px 0 0;
    border-radius: 50%;
    background: $main-blue;
    cursor: pointer;
    border: 0 !important;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    @include sliderThumb;
  }
  &::-moz-range-thumb {
    @include sliderThumb;
  }
  &::-ms-thumb {
    @include sliderThumb;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
  }
  &::-moz-range-track {
    width: 100%;
    height: 2px;
  }
  &::-ms-track {
    width: 100%;
    height: 2px;
  }
  &::-moz-focus-outer {
    border: 0;
  }
}
</style>>
