<template>
<div class="category-header">
  <div class="category-intro ">
    <h1>
      {{ category.name }}
    </h1>
    <p class="p_large">
      {{ category.description }}
    </p>
  </div>
  <div class="category-filters-wrap">
    <div class="category-filters">
      <div
        v-for="filter in $t('category_page.filters')"
        :key="filter.value"
        class="category-item"
        :class="{ active: activeFilter === filter.value }"
        @click="changeFilter(filter.value)"
      >
        {{ filter.name }}
      </div>
      <div class="category-sort">
        <div class="sort-label">
          {{ $t('category_page.sort_by') }}
        </div>
        <TitledSelect
          :options="$t('category_page.sorters')"
          :value="selected"
          label="name"
          track-by="value"
          @input="setSelected"
        />
        <!-- TODO replace dropdown dummy data with real functionality  -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TitledSelect from '@/components/widget/TitledSelect.vue';

export default {
  name: 'category-header',
  components: {
    TitledSelect,
  },
  props: {
    category: {
      type: Object,
      default: () => {},
    },
    activeFilter: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selected: this.$t('category_page.sorters')[0],
    };
  },
  methods: {
    changeFilter(filter) {
      this.$emit('changeFilter', filter);
    },
    setSelected(value) {
      this.selected = value;
      this.$emit('orderProjects', this.selected.value);
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.category-header {
  > div {
    padding: 0 100px;
  }
  .category-intro {
    margin-top: 48px;
    p {
      max-width: 420px;
    }
  }
  .category-filters-wrap {
    margin-top: 64px;
    display: flex;
    .category-filters {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      .category-item {
        @include tab_item;
        color: $grey;
        margin-right: 32px;

        &.active {
          border-bottom: 3px solid $orange-med;
          color: black;
        }
      }
    }
    .category-sort {
      @include subtitle;
      margin-left: auto;
      display: flex;
      align-items: center;

      .sort-label {
        flex: 0 0 auto;
        margin-right: 15px;
      }
      .p-select-wrap {
        margin: 0;
        width: 160px;
        .multiselect {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: $tablet-width-large) {
    > div {
      padding: 0;
    }
  }
  @media (max-width: 560px) {
    .category-filters-wrap {
      .category-sort {
        margin-top: 32px;
        width: 100%;
        .p-select-wrap {
          width: 100%;
        }
      }
    }
  }
}
</style>

