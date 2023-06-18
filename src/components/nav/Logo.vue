<template>
<div class="p-logo-wrap">
  <a class="p-logo" href="/">
    <img class="p-logo-img" :src="require('@/static/img/logo.svg')">
    <img v-if="showLabel" class="p-logo-label" :src="require('@/static/img/logo_text.png')">
  </a>
</div>
</template>

<script>
export default {
  name: 'p-logo',
  props: {
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">

.p-logo-wrap {
  margin-left: 0;
  z-index: 110;

  .p-logo {
    display: flex;
    align-items: center;
    .p-logo-img {
      width: 46px;
    }
    .p-logo-label {
      margin-left: 24px;
      width: 166px;
      height: 16px;
      margin-top: 2px;
    }
  }
  @media (max-width: $tablet-width) {
    .p-logo .p-logo-img {
      width: 40px;
    }
  }
  @media (max-width: $mobile-width) {
    .p-logo .p-logo-label {
      display: none;
    }
  }
}
</style>
