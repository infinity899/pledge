<template>
<div class="container-content settings">
  <h1 class="settings-title">
    {{ $t('settings.title') }}
  </h1>
  <div class="settings-nav">
    <router-link
      v-for="tab in $t('settings.tabs')"
      :key="tab.route"
      :to="{ path: `/settings/${tab.route}` }"
    >
      {{ tab.label }}
    </router-link>
    <hr>
  </div>
  <router-view />
</div>
</template>

<script>

export default {
  name: 'Settings',
};
</script>

<style lang="scss">
@import 'general.scss';

.settings .settings-title {
  margin-top: 60px;
  margin-bottom: 80px;
}

.settings-nav {
  > a {
    @include tab_item;
    padding: 16px 0;

    &:not(:last-child) {
      margin-right: 32px;
    }

    &.router-link-active {
      border-bottom: 3px solid $main-orange;
      color: $main-black;
    }
  }

  hr {
    margin: -3px 0 0;
  }
  @media (max-width: $mobile-width) {
    > a {
      font-size: 12px;
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
}

</style>

