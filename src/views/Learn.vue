<template>
<div class="content">
  <TitleBar :title="$t('learn.titlebar')">
    <div class="search-wrap">
      <input
        type="text"
        :placeholder="$t('learn.query_placeholder')"
      >
      <div id="button-search">
        {{ $t('learn.buttonText.search') }}
      </div>
    </div>
  </TitleBar>
  <div class="learn-nav">
    <router-link
      v-for="tab in $t('learn.tabs')"
      :key="tab"
      :class="($route.name == tab) ? 'selected' : ''"
      :to="`/learn/${tab}`"
    >
      {{ tab | capitalize }}
    </router-link>
  </div>
  <router-view />
</div>
</template>

<script>
import TitleBar from '@/components/widget/TitleBar.vue';

export default {
  name: 'campaign_builder',
  components: {
    TitleBar,
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.search-wrap {
  margin-top: 48px;
  > input {
    @include input;
    width: 320px;
    margin-top: 0;
    height: 40px;
  }
  > div {
    @include orange-button;
    font-size: 0.85em;
    vertical-align: top;
    margin-left: 10px;
    height: 40px;
    line-height: 2.6rem;
  }
}

.learn-nav {
  height: 48px;
  border-top: 1px solid $grey-light;
  border-bottom: 1px solid $grey-light;
  text-align: center;
  background-color: $grey-light;
  > a {
    display: inline-block;
    height: 100%;
    width: 140px;
    line-height: 48px;
    border-left: 1px solid $grey-light;
    color: black;
    font-weight: 700;
    font-size: 1em;
    &:last-child {
      border-right: 1px solid $grey-light;
    }
    &.selected {
      color: white;
      background-color: $main-blue;
    }
  }
}

#button-search {
  text-transform: uppercase;
}
</style>
