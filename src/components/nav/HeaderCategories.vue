<template>
<div v-on-clickaway="close" class="header-categories-wrap">
  <div class="header-categories container">
    <div class="category-options">
      <router-link
        v-for="category in categories"
        :key="category.id"
        class="category"
        :to="{ name: 'projects-category', params: { categoryId: category.id }}"
        @click.native="toggleDropdown(false)"
      >
        <img class="category-image" :src="category.image">
        <span class="category-name">{{ category.name }}</span>
      </router-link>
    </div>
    <div class="listing-options">
      <div
        v-for="(option, idx) in listingOptions"
        :key="idx.toString()"
        class="l-option"
        @click="toggleDropdown(true)"
      >
        <div class="l-option-image">
          <img :src="option.image">
        </div>
        <span class="l-option-name">{{ option.name }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

import icRecentLaunch from '@/static/img/art_icons/recently_launched_small.png';
import icRecentAdd from '@/static/img/art_icons/trending_small.png';
import icAlmostFund from '@/static/img/art_icons/almost_funded_small.png';
import icFullFund from '@/static/img/art_icons/funded_small.png';

const listingOptionImages = [icRecentLaunch, icRecentAdd, icAlmostFund, icFullFund];

export default {
  name: 'header-categories',
  mixins: [clickaway],
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    toggleDropdown: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      showUnimplemented: false,
      listingOptions: this.$t('header.listingOptions').map((option, index) => ({
        ...option,
        image: listingOptionImages[index],
      })),
    };
  },
  methods: {
    close() {
      this.toggleDropdown(false);
    },
  },
};
</script>

<style lang="scss">
@import "general.scss";

.header-categories-wrap {
  overflow: auto;
}

.header-categories {
  padding: 36px 0;
  background-color: $white;

  .category-options,
  .listing-options {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::after {
      content: "";
      flex: auto;
      width: 25%;
    }

    .l-option, .category {
      width: 25%;
      display: flex;
      align-items: center;
      padding: 24px 0;
      cursor: pointer;
    }
  }

  .category-image,
  .l-option-image {
    display: flex;
    justify-content: center;
    margin-right: 20px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .category-options {
    padding-bottom: 46px;
    border-bottom: 1px solid $border-light;

    .category {
      .category-image {
        width: 66px;
        height: 66px;
      }

      .category-name { @include h2; }
    }
  }

  .listing-options {
    margin: 46px 0 16px;

    .l-option {
      .l-option-image {
        width: 50px;
        height: 50px;
      }

      .l-option-name {
        @include h4;
        font-weight: 600;
      }
    }
  }
}

@media (max-width: $desktop-width-small) {
  .header-categories .category-options .category,
  .header-categories .listing-options .l-option {
    width: 33%;
  }
}

@media (max-width: $tablet-width-large) {
  .header-categories .category-options .category,
  .header-categories .listing-options .l-option {
    width: 50%;
  }
}

@media (max-width: $mobile-width) {
  .header-categories {
    padding: 20px;

    .category-options {
      padding-bottom: 40px;

      .category {
        padding: 12px 0;
        .category-image {
          width: 33px;
          height: 33px;
          margin-right: 8px;
        }
        .category-name { @include button_large_text; }
      }
    }

    .listing-options {
      margin-top: 32px;

      .l-option {
        width: 100%;
        padding: 8px 0;

        .l-option-image {
          height: 40px;
          width: 40px;
        }

        .l-option-name { @include subtitle; }
      }
    }
  }
}
</style>
