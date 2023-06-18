<template>
<div class="p-number-wrap">
  <!-- eslint-disable vue-i18n/no-raw-text -->
  <label
    v-if="title"
    class="p-input-title"
    :for="`input${uid}`"
  >
    {{ title }}
  </label>
  <div
    class="p-number-button"
    @click="numberValue -= 1"
  >
    -
  </div>
  <input
    type="number"
    class="p-number"
    :name="`input${uid}`"
    :min="min"
    :max="max"
    :value="numberValue"
    debounce="500"
    @blur="validate"
    @input="numberValue = $event.target.value"
  >
  <div
    class="p-number-button"
    @click="numberValue += 1"
  >
    +
  </div>
  <!-- eslint-enable vue-i18n/no-raw-text -->
</div>
</template>

<script>

export default {
  name: 'p-number',
  props: {
    value: {
      type: Number,
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      default: 10,
      type: Number,
    },
  },
  data() {
    return {
      numberValue: this.value,
    };
  },
  watch: {
    numberValue(val, oldVal) {
      if(val <= this.min) {
        this.numberValue = parseInt(this.min, 10);
      } else if(val >= this.max) {
        this.numberValue = parseInt(this.max, 10);
      } else {
        this.numberValue = parseInt(val, 10);
      }
      if(val <= this.max && val >= this.min) {
        this.$emit('input', val, oldVal);
      }
    },
    value(val) {
      this.numberValue = parseInt(val, 10);
    },
  },
  methods: {
    isInt(value) {
      if(Number.isNaN(value)) {
        return false;
      }
      const x = parseFloat(value);
      return (x | 0) === x; // eslint-disable-line no-bitwise
    },
    validate(evt) {
      const event = evt || window.event;
      const key = String.fromCharCode(event.keyCode || event.which);

      if(this.isInt(key)) {
        event.returnValue = false; // eslint-disable-line no-param-reassign
        if(event.preventDefault) {
          event.preventDefault();
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-number-wrap {
  margin-top: 20px;
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    border: 1px solid $grey-light;
    height: 40px;
    outline: none;
    outline-style: none;
    box-shadow: none;
    text-align: center;
  }
  .p-number-button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: $main-orange;
    color: white;
    display: inline-block;
    vertical-align: top;
    user-select: none;
    text-align: center;
    font-size: 24px;
    line-height: 41px;
    font-weight: 700;
  }
}
</style>
