<template>
<div class="p-checkbox-tree">
  <div
    v-if="isArray"
    class="p-checkbox-array"
  >
    <Checkbox
      v-for="(item, index) in data"
      :key="index"
      :item="item"
      :onCheck="onChildCheck"
    />
  </div>
  <Checkbox
    v-else
    :item="data"
    :onCheck="onChildCheck"
  />
</div>
</template>

<script>
import Vue from 'vue';
import Checkbox from '@/components/widget/Checkbox.vue';

export default {
  name: 'checkbox-tree',
  components: {
    Checkbox,
  },
  props: {
    onCheck: {
      type: Function,
      required: true,
    },
    initialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      data: this.initialData,
    };
  },
  computed: {
    isArray() {
      return this.data instanceof Array;
    },
  },
  methods: {
    setChildren(item) {
      item.children.forEach((child) => {
        Vue.set(child, 'checked', item.checked);
      });
    },
    onChildCheck(item, setChildren = true) {

      Vue.set(item, 'checked', !item.checked);
      if(setChildren && item.children) {
        this.setChildren(item);
      }
      this.onCheck(this.data, item);
    },
  },
  created() {
    // If the parent is checked in the initial data, check all the children
    if(!this.isArray && this.data.checked) {
      this.setChildren(this.data);
    }
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-checkbox-wrap {
  display: flex;
}
</style>
