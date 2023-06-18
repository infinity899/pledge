<template>
<div class="p-radio" :class="{'selectable-input' : selectableInput}">
  <input
    :id="radioID"
    type="radio"
    :name="radioName"
    :value="radioValue"
    :checked="value === radioValue"
  >
  <label :for="radioID" @click="$emit('input', radioValue)">
    <slot />
  </label>
</div>
</template>

<script>
/**
 * Example: <Radio :radioValue="a" v-model="someValue" />
 */
export default {
  name: 'radio',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    radioValue: {
      type: [String, Number],
      default: null,
    },
    radioID: {
      type: String,
      default: '',
    },
    radioName: {
      type: String,
      default: 'name',
    },
    selectableInput: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.selectable-input {
  @include input;
  display: flex;
  align-items: center;

  label {
    width: 100%;
  }
}

.p-radio {
  @include radio;
}
</style>
