<template>
<div class="builder-intro-type">
  <div class="type-header intro-header">
    <h1>{{ $t('builder_intro.intro_type.title1') }}</h1>
    <h1>{{ $t('builder_intro.intro_type.title2') }}</h1>
  </div>
  <div class="type-options">
    <div
      v-for="(item, index) in $t('builder_intro.intro_type.items')"
      :key="index.toString()"
      :class="['option', (type === item.id) && 'selected']"
      @click="$emit('update:type', item.id)"
    >
      <Check v-if="type === item.id" color="#FFF" />
      <div v-else class="option-circle" />
      <div>
        <div>{{ item.title }}</div>
        <div class="option-desc">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
  <button class="builder-continue-button" @click="$emit('nextTab')">
    {{ $t('builder_intro.continue') }}
    <Arrow :color="'white'" />
  </button>
</div>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';
import Check from '@/components/svg/Check.vue';

export default {
  name: 'builder-intro-type',
  components: {
    Arrow,
    Check,
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
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.builder-intro-type {
  text-align: center;
  .type-options {
    margin-top: 32px;
    .option {
      display: flex;
      border: 1px solid $border-light;
      background-color: white;
      max-width: 640px;
      width: 100%;
      margin: 0 auto;
      cursor: pointer;
      padding: 8px 16px;
      text-align: left;
      @include h4;
      .option-circle, svg {
        margin-right: 12px;
      }
      svg {
        margin-top: 5px;
        margin-left: 1px;
      }
      .option-circle {
        border: 2px solid #b2b2b2;
        min-width: 14px;
        width: 14px;
        height: 14px;
        border-radius: 7px;
        margin-top: 3px;
      }
      .option-desc {
        opacity: 0.7;
      }
      &:last-child {
        margin-top: 16px;
      }
      &.selected {
        border: none;
        background-color: $main-blue;
        color: $white;
      }
    }
  }
}

@media (max-width: $mobile-width) {
  .builder-intro-type {
    .type-header { margin-top: 46px; }
  }
}
</style>
