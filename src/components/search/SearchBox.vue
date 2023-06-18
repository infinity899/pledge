<template>
<div class="search-box">
  <form class="search-form" @submit="onSubmit">
    <input
      class="search-input"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
    >
    <span
      v-if="value && value.length"
      class="btn btn-cancel"
      @click="onCancel"
    >
      <img :src="require('@/static/img/ic_close.svg')">
    </span>
    <button class="btn btn-search" type="submit">
      <Search color="white" />
    </button>
  </form>
</div>
</template>

<script>
import Search from '@/components/svg/Search.vue';

export default {
  name: 'search-box',
  components: {
    Search,
  },
  props: {
    initialValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      value: this.initialValue,
      timer: null,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.onSearch(this.value);
    },
    onInput(e) {
      this.value = e.target.value;
    },
    onCancel() {
      this.value = '';
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.search-box {
  margin-bottom: 60px;
  position: relative;

  .search-form {
    width: 100%;
    display: flex;
  }

  .search-input {
    @include input;
    margin: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
    height: 50px;
  }

  .btn-cancel {
    position: absolute;
    top: 16px;
    right: 105px;
    cursor: pointer;
  }

  .btn-search {
    @include orange-button;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    width: 90px;
    min-width: 90px;
    height: 50px;
  }
}
</style>
