<template>
<svg
  :width="16"
  :height="16"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  @click="clickable && $emit('click', $event)"
>
  <defs>
    <path id="a" d="M6.318.84a5.477 5.477 0 0 1 4.367 8.785l3.254 3.254-1.06 1.06-3.254-3.254A5.477 5.477 0 1 1 6.318.841zm0 1.5a3.977 3.977 0 1 0 0 7.955 3.977 3.977 0 0 0 0-7.954z" />
  </defs>
  <g fill="none" fill-rule="evenodd">
    <mask id="b" fill="#fff"><use xlink:href="#a" /></mask>
    <use :fill="color" fill-rule="nonzero" xlink:href="#a" />
    <g fill="#000" mask="url(#b)"><path d="M0 0h14v14H0z" /></g>
  </g>
</svg>
</template>

<script>

export default {
  name: 'search',
  props: {
    color: {
      type: String,
      default: 'black',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 20,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
  },
};
</script>
