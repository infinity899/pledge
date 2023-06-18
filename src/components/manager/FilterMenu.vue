<template>
<div v-on-clickaway="closeMenu" class="filter-wrap">
  <div v-if="!mobile" class="filter-wrap-desktop">
    <div
      class="filter-button"
      :class="{'filter-checked': itemsChecked, 'menu-open': isActive && !itemsChecked}"
      @click="toggleMenu"
    >
      {{ `${filterType} ${itemsChecked ? `(${itemsChecked})` : ''}` }}
    </div>
    <div
      v-if="isActive"
      class="menu-dropdown"
      :class="itemsClass"
    >
      <slot name="search" />
      <div :class="wrapperClass">
        <div
          v-for="(itemType, index) in items"
          :key="index"
          class="filter-item"
          @click="handleCheck(itemType)"
        >
          <Checkbox
            :item="{ checked: isChecked(itemType) }"
            :onCheck="() => handleCheck(itemType)"
          />
          <div class="item">
            {{ itemType.title }}
          </div>
          <!-- For rewards -->
          <div class="chevron-wrap" @click="(e) => toggleRewardTypesMenu(index, e)">
            <div
              v-if="itemType.types && itemType.types.length"
              class="backer-chevron ascending"
              :class="rewardTypesOpen(index) ? '' : 'ascending'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="mobile && isActive"
    class="menu-dropdown"
    :class="'mobile'"
  >
    <div :class="wrapperClass">
      <div
        v-for="(itemType, index) in items"
        :key="index"
        class="filter-item-mobile"
        @click="handleCheck(itemType)"
      >
        <div>
          <Checkbox
            :item="{ checked: isChecked(itemType) }"
            :onCheck="() => handleCheck(itemType)"
          />
        </div>
        <div
          class="item"
        >
          {{ itemType.title }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// TODO: support sub-selections
import { mixin as clickaway } from 'vue-clickaway';
import Checkbox from '@/components/widget/Checkbox.vue';

export default {
  name: 'filter-menu',
  components: {
    Checkbox,
  },
  mixins: [clickaway],
  props: {
    project: {
      type: Object,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
    itemsChecked: {
      type: Number,
      default: null,
    },
    filterType: {
      type: String,
      default: null,
    },
    isChecked: {
      type: Function,
      default: () => {},
    },
    itemsClass: {
      type: Object,
      default: null,
    },
    wrapperClass: {
      type: String,
      default: null,
    },
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    handleCheck(type) {
      this.$emit('check', type);
      this.closeMenu();
    },
    closeMenu() {
      this.isActive = false;
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    escapeListener(event) {
      if(event.keyCode === 27) {
        this.closeMenu();
      }
    },
  },
  mounted() {
    window.addEventListener('keyup', this.escapeListener);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.escapeListener);
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.menu-dropdown {
  &.mobile {
    position: relative;
    top: 0;
    border: none;
  }

  .filter-item-mobile {
    @include button_small_text;
    font-weight: 600;
    padding: 15px;
    width: 225px;
    border-bottom: 1px solid $border-light;
    background-color: $grey-lighter;
    cursor: pointer;

    .item {
      padding-left: 25px;
      padding-top: 4px;
    }
  }
}

</style>
