<template>
<a class="logo" href="/">
  <img class="logo-img" :src="require('@/static/img/logo.svg')">
  <span class="logo-label">{{ $t('company') }}</span>
</a>
</template>

<script>
export default {
  name: 'p-logo',
};
</script>

<style lang="scss">
.logo {
  display: inline-block;

  &-img {
    margin-right: 12px;
    vertical-align: middle;
  }

  &-label {
    font-family: $font-title;
    font-weight: 700;
    line-height: normal;
    font-size: 14px;
    letter-spacing: 2px;
    color: $main-orange;
    vertical-align: middle;
  }
}
</style>
