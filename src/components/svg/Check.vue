<template>
<svg
  viewBox="0 0 14 11"
  width="14"
  height="11"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M1,6.2 L4.4,9.6 L12.5,1.5 L4.4,9.6 Z"
    :stroke="color"
    stroke-linecap="round"
    stroke-width="2"
  />
</svg>
</template>

<script>

export default {
  name: 'check',
  props: {
    color: {
      type: String,
      default: 'black',
    },
  },
};
</script>
