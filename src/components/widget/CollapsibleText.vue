<template>
<div>
  <div v-if="!showFullText && text && text.length > limit" :class="textClass">
    {{ text | limit_string(limit) }}
  </div>
  <div v-else :class="textClass">
    {{ text }}
  </div>
  <div
    v-if="showMore && text && text.length > limit"
    class="show-less-more"
    @click="showFullText = !showFullText"
  >
    <div>
      {{ showFullText ? $t('show_less') : $t('show_more') }}
    </div>
  </div>
  <slot />
</div>
</template>

<script>
export default {
  name: 'collapsible-text',
  props: {
    limit: {
      type: Number,
      default: 150,
    },
    text: {
      type: String,
      default: '',
    },
    textClass: {
      type: String,
      default: null,
    },
    showMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showFullText: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'general.scss';

.show-less-more {
  @include subheading;
  text-transform: uppercase;
  color: $main-blue;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;
  > div {
    text-align: right;
    width: 100%;
  }
}
</style>
