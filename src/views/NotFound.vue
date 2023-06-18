<template>
<div class="container not-found">
  <img :src="require('@/static/img/art/empty_state1.png')">
  <h3>{{ $t('not_found.title') }}</h3>
  <p>{{ $t('not_found.description') }}</p>
  <router-link to="/" class="link">
    {{ $t('not_found.link_to_home') }}
  </router-link>
</div>
</template>

<script>
export default {
  name: 'not-found',
};
</script>

<style lang="scss">
@import 'general.scss';

.not-found {
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 120px;
  padding-bottom: 120px;
  text-align: center;

  img {
    width: 220px;
    margin-bottom: 20px;
  }

  p {
    @include p_small;
    margin: 12px 0 15px;
    color: rgba($main-black, 0.8);
  }

  a {
    @include button_small_text;
    color: $main-blue;
  }
}
</style>
