<template>
<div class="markdown-container" v-html="htmlContent" />
</template>

<script>
import * as showdown from 'showdown';

export default {
  name: 'markdown',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  computed: {
    htmlContent() {
      const converter = new showdown.Converter();
      return converter.makeHtml(this.content);
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.markdown-container {
  @include markdown();
}
</style>
