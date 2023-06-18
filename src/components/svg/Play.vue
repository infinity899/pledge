<template>
<svg
  :width="7 * sizeMultiple"
  :height="9 * sizeMultiple"
  viewBox="0 0 7 9"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M1,4.5 L1,0.25 L6.5,4.5 L1,8.75" fill="white" />
</svg>
</template>

<script>
export default {
  name: 'play',
  props: {
    sizeMultiple: {
      type: Number,
      default: 1,
    },
  },
};
</script>
