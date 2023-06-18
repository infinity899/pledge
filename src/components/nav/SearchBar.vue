<template>
<div
  v-on-clickaway="close"
  class="search-bar"
  :class="{ 'search-page': searchPage, active: showSearchBar }"
>
  <div class="search-bar-content">
    <form
      class="search-form"
      @submit="onSubmit"
      @click="$event.stopPropagation()"
    >
      <Search
        class="search-bar-toggle"
        :size="16"
        :clickable="true"
        @click="searchClick"
      />
      <input
        ref="input"
        v-model="query"
        class="input-search"
        placeholder=" Search"
        type="text"
        @input="onInput"
        @focus="onInputFocus"
      >
      <div
        v-if="query || showSearchBar || searchPage"
        class="btn btn-cancel"
        @click="cancelClick"
      >
        <img
          :src="require('@/static/img/ic_close.svg')"
        >
      </div>
    </form>
    <div v-if="showSearchBar && query && !searchPage && initialSearchComplete" class="search-result">
      <div class="search-results">
        <template v-if="categories.length">
          <div class="results-title">
            <span>{{ $t('header.search.categories') }}</span>
          </div>
          <div class="results-list">
            <ul v-for="category of categories" :key="category.id">
              <li>
                <router-link :to="{ name: 'projects-category', params: { categoryId: category.id }}">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>
          <hr>
        </template>

        <template v-if="creators.length">
          <div class="results-title">
            <span>{{ $tc('header.search.creators', creatorPagination.total_count || 0) }}</span>
            <router-link :to="{ name: 'search', query: { query }}">
              {{ $t('project.view_all') }}
            </router-link>
          </div>
          <div class="results-list">
            <ul v-for="creator of creators" :key="creator.id">
              <li class="creator-result-item">
                <span>{{ creator.name }}</span>
              </li>
            </ul>
          </div>
          <hr>
        </template>

        <div class="results-title">
          <span>{{ $tc('header.search.projects', projectPagination.total_count || 0) }}</span>
          <router-link
            v-if="projects.length"
            :to="{ name: 'search', query: { query }}"
          >
            {{ $t('project.view_all') }}
          </router-link>
        </div>
        <div class="results-list">
          <router-link
            v-for="p in projects"
            :key="p.id"
            :to="{ name: 'project', params: {id: p.id, tab: 'campaign'}}"
          >
            <div class="results-item project-result-item">
              <div class="project-logo" :style="{ backgroundImage: `url(${p.main_image.url})` }" />
              <div class="project-info">
                <div class="short-info">
                  <span class="raised">
                    {{ $tc('project.raised', $options.filters.from_cents(p.total_pledged)) }}
                  </span>
                  <span v-if="daysLeft(p.end_time) > 0" class="days-left">
                    {{ $tc('project.days_left', daysLeft(p.end_time)) }}
                  </span>
                </div>
                <div class="name">
                  {{ p.name }}
                </div>
                <div class="progress">
                  <ProgressBar :percent="Math.ceil(100 * (p.total_pledged / p.funding_goal))" />
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <router-link :to="{ name: 'search', query: { query }}">
        <div class="view-results">
          {{ projects.length ? $tc('header.search.view_results', allResultCount) : $t('header.search.view_filters') }}
          <Arrow :color="'white'" />
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

import moment from 'moment';
import * as api from '@/utils/api';
import Arrow from '@/components/svg/Arrow.vue';
import Search from '@/components/svg/Search.vue';
import ProgressBar from '@/components/widget/ProgressBar.vue';
import { GET_SEARCH_RESULTS_REQUEST } from '@/store/actions';

export default {
  name: 'search-bar',
  components: {
    Arrow,
    Search,
    ProgressBar,
  },
  mixins: [clickaway],
  data() {
    return {
      query: '',
      searchPage: false,
      showSearchBar: false,
      categories: [],
      creators: [],
      projects: [],
      creatorPagination: {},
      projectPagination: {},
      timer: null,
      initialSearchComplete: false,
    };
  },
  computed: {
    allResultCount() {
      return this.projectPagination.total_count || 0;
    },
  },
  watch: {
    $route() {
      this.clearSearch();
      const { query } = this.$route.query;
      // Users can navigate directly to /search
      this.searchPage = this.$route.name === 'search';
      this.query = query || '';
    },
  },
  methods: {
    onInput() {
      if(this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const { query } = this;
      if(query && query.length) {
        this.timer = setTimeout(this.search, 500, query);
      } else {
        this.projects = [];
        this.projectPagination = {};
        this.initialSearchComplete = false;
      }
    },
    searchClick(e) {
      e.stopPropagation();
      this.showSearchBar = true;
      this.$emit('showOverlay', true);
      this.onInputFocus();
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onInputFocus() {
      document.addEventListener('keyup', this.escapeListener);
      this.showSearchBar = true;
    },
    onSubmit(e) {
      e.preventDefault();
      const { query } = this;
      if(!query || !query.length) {
        return;
      }
      this.$router.push({ name: 'search', query: { query } });
      if(!this.searchPage) {
        this.clearSearch();
      } else {
        this.$store.dispatch(GET_SEARCH_RESULTS_REQUEST, query);
      }
    },
    cancelClick(e) {
      e.stopPropagation();
      this.clearSearch();
    },
    clearSearch() {
      this.showSearchBar = false;
      this.query = '';
      this.projects = [];
      this.projectPagination = {};
      if(this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.$emit('showOverlay', false);
    },
    search(query) {
      if(query && query.length) {
        if(this.searchPage) {
          this.$store.dispatch(GET_SEARCH_RESULTS_REQUEST, query);
        } else {
          api.search({ query, page: 1, perPage: 3 })
            .then((data) => {
              this.projects = data.projects;
              this.projectPagination = data.pagination;
              if(this.projects.length) {
                this.$emit('showOverlay', true);
              }
              if(!this.initialSearchComplete) {
                this.initialSearchComplete = true;
              }
            });
        }
      }
    },
    escapeListener(event) {
      if(event.keyCode === 27) {
        this.clearSearch();
        this.$refs.input.blur();
      }
    },
    daysLeft(time) {
      return time.diff(moment(), 'days');
    },
    close() {
      if(this.showSearchBar) {
        this.clearSearch();
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.search-bar {
  position: relative;
  overflow: visible;
  height: 100px;
  flex-grow: 1;
  max-width: 485px;

  &.active {
    z-index: 210;
  }

  .search-bar-content {
    background-color: transparent;
    height: 80px;

    .search-form {
      display: block;
      text-align: right;
      position: relative;
      height: 100%;

      .search-bar-toggle {
        position: absolute;
        bottom: 21px;
      }

      .input-search {
        border: none;
        outline: none;
        color: $main-black;
        font-family: $font-title;
        font-size: 16px;
        font-weight: 600;
        width: 270px;
        transition: width 0.3s ease;
        height: 48px;
        margin-top: 29px;
        padding: 0 20px 0 30px;
        background: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        &::placeholder {
          font-family: $font-title;
          color: $main-black;
          font-weight: 600;
        }
      }

      .btn-cancel {
        position: absolute;
        cursor: pointer;
        bottom: 18px;
        right: 25px;
      }
    }
  }

  &.search-page {
    margin-right: auto;

    .search-bar-content {
      box-shadow: none !important;

      .search-form {
        .input-search {
          margin-left: 0;
          max-width: 400px;
          width: 100%;
        }
        .btn-cancel {
          right: 0;
        }
      }
    }
  }

  &:not(.search-page) {
    &.active {
      z-index: 210;

      .search-bar-content {
        background-color: white;
        opacity: 100;
        border-bottom: 1px solid #e0e0e0;
        box-shadow: 0 10px 34px rgba(0, 0, 0, 0.05);
        justify-content: flex-start;
      }

      .search-form {
        width: 100%;
        max-width: 100%;
        .search-bar-toggle {
          left: 25px;
        }
        .input-search {
          margin-left: 20px;
          border-bottom: none;
          width: 100%;

          &::placeholder {
            color: $black-light30;
          }
        }

        .btn-cancel {
          opacity: 0.3;
        }
      }
    }
  }

  .search-result-empty-mobile {
    @include h4;
    font-weight: 600;
    text-align: center;
    padding: 20px 0 15px;
  }

  .search-result {
    text-align: left;
    border-top: 1px solid $grey-light;
    max-width: 515px;
    background-color: $white;

    .search-results {
      margin: 10px 0;
      hr {
        margin: 30px 0;
      }
      .results-title {
        @include subheading;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        > span {
          text-transform: uppercase;
          opacity: 0.5;
        }
      }
      .results-list {
        padding: 5px 15px;
        font-weight: 500;
      }
      .creator-result-item {
        background-color: rgba(216, 216, 216, 0.2);
        display: inline-block;
        padding: 4px 10px;
        border-radius: 20px;
        margin: 10px 10px 0 0;
      }
      .project-result-item {
        display: flex;
        min-width: 0;
        padding: 10px 0;

        .project-logo {
          min-width: 50px;
          width: 50px;
          height: 72px;
          background-position: center;
          background-size: cover;
          margin-right: 15px;
        }

        .project-info {
          position: relative;

          > div {
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
            text-overflow: ellipsis;
            width: 100%;
            display: block;
          }
          .short-info {
            text-transform: uppercase;
            .raised {
              @include subheading;
              color: $main-blue;
            }
            .days-left {
              @include subheading;
            }
          }
          .name {
            @include h4;
          }
          .progress {
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
    }

    .view-results {
      @include button($main-black, full);
      display: flex;
      svg {
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
  }

  .blur-back {
    position: absolute;
  }
}

@media (max-width: $tablet-width-large) {
  .search-bar {
    margin-right: 20px;
    flex: 0;

    .search-bar-content {
      .search-form {
        .input-search {
          display: none;
        }
      }

      .search-result-empty-mobile {
        margin-top: -29px;
      }

      .search-result {
        border-top: none;
      }
    }

    &.search-page {
      width: 100%;

      .search-bar-content {
        height: 44px;

        .search-form {
          .search-bar-toggle {
            top: 8px;
            left: 0;
          }
          .input-search {
            display: block;
            margin-top: 0;
            height: 40px;
            padding-bottom: 8px;
          }
          .btn-cancel {
            top: 10px;
            right: 5px;
            opacity: 1;
          }
        }
      }
    }

    &:not(.search-page) {
      &.active .search-bar-content {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        box-shadow: none;

        .search-form {
          .search-bar-toggle {
            left: 24px;
            top: 24px;
            width: 14px;
            height: 14px;
          }
          .input-search {
            display: block;
            height: 64px;
            padding-top: 0;
          }
          .btn-cancel {
            opacity: 1;
            bottom: 36px;
          }
        }
        .search-result {
          max-width: 100%;
        }
      }

      .search-form .btn-cancel.mobile-hide {
        display: none;
      }
    }
  }
}
</style>
