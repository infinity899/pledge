<template>
<div class="tab-bar-wrap">
  <div class="tab-bar" :class="{ cls }">
    <div class="tab-bar-active" @click="toggleMenu">
      <slot name="active">
        <div class="tab-bar-menu-item selected">
          {{ activeTab.label }}
          <img :src="require('@/static/img/icons/ic_down.svg')">
        </div>
      </slot>
    </div>
    <div v-show="showMenu" class="tab-bar-menu">
      <slot name="menu">
        <div
          v-for="tab in tabs"
          :key="tab.label"
          class="tab-bar-menu-item"
          :class="{ selected: (tab.label === activeTab.label) }"
          @click="() => { onChangeTab(tab); toggleMenu(); }"
        >
          {{ tab.label }}
        </div>
      </slot>
    </div>
    <div class="tab-bar-right">
      <slot name="right" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'tab-bar',
  props: {
    cls: {
      type: String,
      default: null,
    },
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: Object,
      required: true,
    },
    onChangeTab: {
      type: Function,
      required: true,
    },
    updatesCount: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
.tab-bar {
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: visible;
  z-index: 10;
  .tab-bar-active {
    display: none;
  }
  .tab-bar-menu {
    display: flex;
    flex-direction: row;
  }
  .tab-bar-menu-item {
    @include tab_item;
    &:not(:last-of-type) {
      margin-right: 32px;
    }
    &.selected {
      border-bottom: 3px solid $main-orange;
      color: $main-black;
    }
  }
  .tab-bar-right {
    margin-left: auto;
    display: flex;
  }
  @media (min-width: $tablet-width + 1px) {
    .tab-bar-menu {
      display: flex !important;
    }
  }
  @media (max-width: $tablet-width) {
    .tab-bar-active {
      display: block;
      .tab-bar-menu-item.selected {
        font-weight: 700;
      }
    }
    .tab-bar-menu {
      flex-direction: column;
      max-width: 280px;
      width: 100%;
      position: absolute;
      top: 100%;
      background: white;
      border: 1px solid $border-light;
      border-radius: 4px;
      overflow: hidden;
      .tab-bar-menu-item {
        @include tab_item;
        font-weight: 400;
        padding: 0 20px;
        color: $main-black;
        margin-right: 0;
        &:not(:last-of-type) {
          border-bottom: 1px solid $border-light;
        }
        &.selected {
          background-color: $main-blue;
          color: $white;
        }
      }
    }
  }
}
</style>
