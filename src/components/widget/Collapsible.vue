<template>
<div :class="{ 'collapsible-wrapper': true, collapsible, collapsed: collapsed }">
  <div v-if="collapsible" class="collapsible-header">
    <slot name="header" />
    <button class="btn-collapse" @click="collapse(!collapsed)">
      {{ collapsed ? expandText : collaseText }}
    </button>
  </div>
  <div class="collapsible-content">
    <slot name="content" />
  </div>
</div>
</template>

<script>
export default {
  name: 'collapsible',
  props: {
    collaseText: {
      type: String,
      default: 'Collapse',
    },
    expandText: {
      type: String,
      default: 'Expand',
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    defaultCollapsed: {
      type: Boolean,
      default: true,
    },
    onCollapse: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    collapse(collapsed) {
      this.collapsed = collapsed;
      this.onCollapse(this.collapsed);
    },
  },
  mounted() {
    this.collapsed = this.defaultCollapsed;
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.collapsible-wrapper {
  .collapsible-header {
    display: none;
    justify-content: space-between;
    align-items: center;
    margin: 56px 0;
    overflow: hidden;

    .btn-collapse {
      @include button($main-blue, small, secondary);
      margin: 24px 0;
      padding-left: 12px;
      padding-right: 12px;
      width: 86px;
    }
  }

  &.collapsible {
    .collapsible-header {
      display: flex;
    }
    .collapsible-content {
      max-height: 2000px;
      transition: max-height 0.5s ease-in;
      overflow: hidden;
      @media (max-width: $tablet-width-large) {
        max-height: 3000px;
      }
    }
    &.collapsed {
      .collapsible-content {
        max-height: 0;
      }
    }
  }

  @media (max-width: $tablet-width) {
    &.collapsible .collapsible-header {
      display: block;
      .btn-collapse {
        margin-bottom: 0;
      }
    }
  }
}
</style>
