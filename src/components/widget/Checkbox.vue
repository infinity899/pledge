<template>
<div class="p-checkbox-wrap">
  <label class="p-checkbox">
    <input
      type="checkbox"
      :checked="item.checked"
      @change="onSelfCheck"
    >
    <span class="checkmark" :class="checkedState" />
    <span v-if="item.label" class="checkbox-text" v-html="item.label" />
  </label>
  <checkbox
    v-for="(child, index) in item.children"
    :key="index"
    :item="child"
    :onCheck="onChildCheck"
  />
</div>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    onCheck: {
      type: Function,
      default: null,
    },
  },
  computed: {
    checkedState() {
      if(this.childrenChecked) {
        return 'checked';
      }
      if(this.childrenUnchecked) {
        return '';
      }
      if(this.item.children) {
        return 'partial';
      }
      return this.checked ? 'checked' : '';
    },
    childrenChecked() {
      const { children } = this.item;
      if(children) {
        return children.every(child => child.checked);
      }
      return false;
    },
    childrenUnchecked() {
      const { children } = this.item;
      if(children) {
        return children.every(child => !child.checked);
      }
      return false;
    },
  },
  methods: {
    onSelfCheck() {
      if(this.onCheck) {
        this.onCheck(this.item);
      }
    },
    onChildCheck(item, setChildren = true) {
      this.onCheck(item, setChildren);
      if((this.childrenChecked && !this.item.checked)
        || (this.childrenUnchecked && this.item.checked)) {

        this.onCheck(this.item, false);
      }

    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-checkbox {
  @include checkbox;
  padding-top: 1px;
}
</style>
