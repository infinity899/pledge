<template>
<svg
  viewBox="0 0 18 9"
  width="18"
  height="9"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  @click="clickable && $emit('click')"
>
  <path :fill="color" :transform="back ? 'scale(-1,1) translate(-18, 0)' : ''" d="M15.24,5.4 L0,5.4 L0,4 L15.24,4 L12.2,1 L13.2,0 L18,4.5 L13.2,9 L12.2,8 L15,5.4 Z" />
</svg>
</template>

<script>

export default {
  name: 'arrow',
  props: {
    color: {
      type: String,
      default: 'black',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
