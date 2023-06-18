<template>
<svg
  width="10px"
  height="6px"
  viewBox="0 0 10 6"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  :transform="transform"
>
  <g
    id="Page-1"
    stroke="block"
    stroke-width="1"
    fill="none"
    fill-rule="evenodd"
  >
    <g id="try" :fill="color" fill-rule="nonzero">
      <polygon
        id="Path"
        points="5.26557 2.32586 8.7352 5.79553 9.7959 4.73487 5.26557 0.20454 0.73524 4.73487 1.7959 5.79553"
      />
    </g>
  </g>
</svg>
</template>

<script>

export default {
  name: 'Chevron',
  props: {
    color: {
      type: String,
      default: 'black',
    },
    rotationAngle: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    transform() {
      return `rotate(${this.rotationAngle})`;
    },
  },
};
</script>
