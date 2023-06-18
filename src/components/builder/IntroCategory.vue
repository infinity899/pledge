<template>
<div class="builder-intro-category">
  <h1 class="intro-header">
    {{ $t('builder_intro.intro_category.title') }}
  </h1>
  <div class="intro-category-desc">
    {{ $t('builder_intro.intro_category.desc') }}
  </div>
  <div class="intro-category-help">
    <a target="_blank" href="https://medium.com/@pledgecamp/pledgecamp-product-categories-fe454274d5d9">
      {{ $t('builder_intro.intro_category.help') }}
    </a>
  </div>
  <div class="intro-categories">
    <div
      v-for="(category, index) in $store.getters.categories"
      :key="category.name"
      :class="{ 'intro-category': true, selected: (index === categoryId) }"
      @click="selectCategory(index)"
    >
      <div
        class="intro-category-image"
        :style="{'background-image': `url(${category.image})`}"
      />
      <div class="intro-category-name">
        {{ category.name }}
      </div>
    </div>
  </div>
  <button
    v-if="categoryId !== null"
    class="builder-continue-button"
    @click="$emit('nextTab')"
  >
    {{ $t('builder_intro.continue') }}
    <Arrow color="white" />
  </button>
  <div>
    <div
      class="intro-category-skip"
      @click="$emit('nextTab')"
    >
      {{ $t('builder_intro.intro_category.skip') }}
    </div>
  </div>
</div>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'builder-intro-category',
  components: {
    Arrow,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    eligible: Boolean,
  },
  methods: {
    selectCategory(index) {
      if(index === this.categoryId) {
        this.$emit('update:categoryId', null);
      } else {
        this.$emit('update:categoryId', index);
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.builder-intro-category {
  text-align: center;
  h1 {
    margin-top: 80px;
  }
  .intro-category-desc {
    @include p_large;
    margin-top: 32px;
  }
  .intro-category-help {
    @include button_small_text;
    margin-top: 16px;
    a {
      color: $main-blue;
    }
  }
  .intro-categories {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 8px 0 16px;

    .intro-category {
      display: flex;
      height: 46px;
      border: 1px solid $border-light;
      align-items: center;
      cursor: pointer;
      margin-top: 24px;
      .intro-category-image {
        background-size: cover;
        width: 42px;
        height: 42px;
        margin-left: 2px;
      }
      .intro-category-name {
        @include h4;
        padding: 0 24px;
      }
      &:not(:last-child) {
        margin-right: 24px;
      }
      &.selected {
        background-color: $main-blue;
        border-color: transparent;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.25);
        .intro-category-image {
          opacity: 0.4;
          width: 46px;
          height: 46px;
          margin-left: 0;
        }
        .intro-category-name {
          color: white;
        }
      }
    }
  }
  .builder-continue-button {
    margin: 32px 0 0;
    width: 144px;
  }
  .intro-category-skip {
    @include button_small_text;
    cursor: pointer;
    display: inline-block;
    margin: 32px auto;
    border-bottom: 1px solid black;
  }
}

@media (max-width: $mobile-width) {
  .intro-category-image {
    display: none;
  }
}
</style>
