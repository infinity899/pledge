<template>
<div class="container search">
  <div class="search-header">
    <div class="tab">
      <span
        class="tab-item"
        @click="onChangeTab('project')"
      >
        {{ $tc('header.search.projects', projectPagination.total_count || 0) }}
      </span>
    </div>
    <div class="filter-select">
      <span>{{ $t('category_page.sort_by') }}</span>
      <TitledSelect
        :options="categories"
        :value="selectedCategoryId || categories[0]"
        label="name"
        track-by="id"
        @input="onChangeCategory"
      />
    </div>
  </div>
  <div class="projects-results">
    <div
      v-if="hasQuery && !projects.length"
      class="empty"
    >
      {{ $t('header.search.empty') }}
    </div>
    <ProjectList
      v-else
      :projects="projects"
    />
  </div>
</div>
</template>

<script>
import ProjectList from '@/components/widget/ProjectList.vue';
import { GET_SEARCH_RESULTS_REQUEST } from '@/store/actions';
import TitledSelect from '@/components/widget/TitledSelect.vue';

export default {
  name: 'search',
  components: {
    TitledSelect,
    ProjectList,
  },
  data() {
    return {
      selectedCategoryId: 0,
      options: {},
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categoriesWithAll;
    },
    projects() {
      return this.$store.getters.projectsSearchResult;
    },
    projectPagination() {
      return this.$store.getters.projectsSearchResultPagination;
    },
    // For rare instances in which users navigate directly to /search
    hasQuery() {
      const { query } = this.$route.query;
      return query;
    },
  },
  methods: {
    onChangeCategory(id) {
      this.selectedCategoryId = id;
    },
  },
  created() {
    const { query } = this.$route.query;
    if(query) {
      this.$store.dispatch(GET_SEARCH_RESULTS_REQUEST, query);
    }
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.search {
  padding-top: 50px;
  padding-bottom: 50px;
  min-height: 600px;

  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap-reverse;

    .tab {
      padding-bottom: 12px;
      border-bottom: 3px solid $main-orange;
      margin-right: 10px;

      .tab-item {
        font-family: $font-title;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: $main-black;
      }
    }

    .filter-select {
      display: flex;
      align-items: center;
      padding-bottom: 25px;

      > span {
        @include subtitle;
      }

      .p-select-wrap {
        width: 180px;
        margin-left: 15px;
      }
    }
  }

  .projects-results {
    margin-top: 36px;

    .category-list {
      display: flex;
      border-bottom: 1px solid $grey-light;

      .category-item {
        color: $main-black;
        padding: 15px 0;
        margin-right: 30px;
        margin-bottom: -1px;
        cursor: pointer;

        &.selected {
          border-bottom: 2px solid $main-black;
        }
      }
    }
    .empty {
      @include h3;
      text-align: center;
    }
  }

  @media (max-width: $tablet-width-large) {
    padding-top: 100px;
  }
}

.header.fixed {
  position: fixed;
  background: white;

  .search-header {
    position: fixed;
    margin-top: 40px;
    background: white;
    width: 100%;
    z-index: 10;
    padding-right: 40px;
  }
  .projects-results {
    margin-top: 169px;
  }
}
</style>
