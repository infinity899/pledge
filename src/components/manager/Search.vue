<template>
<div class="insights-search">
  <img class="search-header-icon" :src="require('@/static/img/art_icons/search_small.png')">
  <div class="search-header">
    {{ $t('manager.insights.search.header') }}
  </div>
  <form class="insights-search-form" @submit="onSubmit">
    <div>
      <Search class="search-icon" />
    </div>
    <input
      class="insights-search-input"
      :placeholder="$t('manager.insights.search.placeholder')"
      :value="value"
      @input="onInput"
    >
    <div class="insights-search-button" @click="handleSearch">
      {{ $t('manager.insights.search.search') }}
    </div>
  </form>
  <div class="search-links">
    <div class="search-link" @click="showUnimplemented = true">
      {{ $t('manager.insights.search.forum') }}
      <Arrow color="#2E40EA" />
    </div>
    <div class="search-link" @click="showUnimplemented = true">
      {{ $t('manager.insights.search.knowledge') }}
      <Arrow color="#2E40EA" />
    </div>
  </div>
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';
import Search from '@/components/svg/Search.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'insights_search',
  components: {
    Arrow,
    Search,
    UnimplementedModal,
  },
  data() {
    return {
      value: '',
      showUnimplemented: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.handleSearch(this.value);
    },
    onInput(e) {
      this.value = e.target.value;
    },
    handleSearch() {
      this.showUnimplemented = true;
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.insights-search {
  text-align: center;
  margin: 64px auto;
  .search-header-icon {
    height: 50px;
    margin-bottom: 24px;
  }
  .search-header {
    @include h2;
    margin-bottom: 16px;
  }
  .insights-search-form {
    display: flex;
    width: 645px;
    border: 1px solid $border-light;
    height: 52px;
    margin: 0 auto;
    .search-icon {
      height: 14px;
      width: 14px;
    }
    .insights-search-button,
    .insights-search-input {
      @include subtitle;
      padding-top: 4px;
    }
    .insights-search-input {
      width: 100%;
      border: none;
      outline: none;
      min-width: 0;
      &::placeholder {
        color: rgba(0, 0, 0, 0.2);
        opacity: 1;
      }
    }
    > div {
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0 16px;
      &:last-child {
        cursor: pointer;
      }
    }
  }
  .search-links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 24px 0;
    .search-link {
      color: $main-blue;
      @include button_small_text;
      margin: 0 20px;
      cursor: pointer;
      svg {
        margin: 0 5px;
      }
    }
  }

  @media (max-width: $tablet-width) {
    box-sizing: border-box;
    .insights-search-form {
      width: 100%;
    }
  }
  @media (max-width: $mobile-width) {
    .search-links {
      flex-direction: column;
      margin-top: 8px;
      .search-link {
        margin-top: 24px;
      }
    }
  }
}

</style>
