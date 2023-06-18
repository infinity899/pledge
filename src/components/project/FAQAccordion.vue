<template>
<div class="faq-item">
  <div class="faq-accordion-wrap">
    <div class="faq-accordion" @click="toggleContent">
      <div class="faq-title">
        {{ value.question }}
      </div>
      <!-- eslint-disable -->
      <svg width="21" height="12" viewBox="0 0 23 14" :class="{ 'opened': isOpened }">
        <g>
          <line x1="1" y1="1" x2="11.5" y2="12" class="svg_line" stroke-linecap="round" />
          <line x1="11.5" y1="12" x2="22" y2="1" class="svg_line" stroke-linecap="round" />
        </g>
      </svg>
      <!-- eslint-enable -->
    </div>
    <div class="panel" :class="{ 'opened': isOpened }">
      {{ value.answer }}
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'faq-accordion',
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    toggleContent() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.faq-item {
  width: 100%;
  border-bottom: 1px solid $border-light;

  .faq-accordion-wrap {
    .faq-accordion {
      cursor: pointer;
      height: 86px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .faq-title {
        @include h4;
        margin-right: 32px;
      }
      svg {
        flex-shrink: 0;
        transition: transform 0.2s ease-in-out;
        position: relative;
        top: -1px;
        &.opened {
          transform: rotate(180deg);
        }
      }
    }

    .panel {
      font-family: $font-normal;
      font-size: 18px;
      height: 0;
      overflow: hidden;

      &.opened {
        padding-bottom: 32px;
        height: unset;
      }
    }
  }
}
</style>
