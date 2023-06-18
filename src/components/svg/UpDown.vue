<template>
<div class="p-up-down">
  <svg
    :class="{ disabled: disabledUp }"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="$emit('up')"
  >
    <path d="M7.26557 6.32586L10.7352 9.79553L11.7959 8.73487L7.26557 4.20454L2.73524 8.73487L3.7959 9.79553L7.26557 6.32586Z" fill="#000307" />
  </svg>
  <svg
    :class="{ disabled: disabledDown }"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="$emit('down')"
  >
    <path d="M7.26557 7.67414L10.7352 4.20447L11.7959 5.26513L7.26557 9.79546L2.73524 5.26513L3.7959 4.20447L7.26557 7.67414Z" fill="#000307" />
  </svg>
</div>
</template>
<script>
export default {
  name: 'up-down',
  props: {
    disabledUp: Boolean,
    disabledDown: Boolean,
  },
};
</script>

<style lang="scss">
.p-up-down {
  display: inline-block;
  position: relative;
  & > svg {
    display: block;
    cursor: pointer;
    margin: 0;

    &.disabled {
      pointer-events: none;
      opacity: 0.7;
    }
  }
}
</style>

