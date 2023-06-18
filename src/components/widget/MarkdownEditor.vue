<template>
<div ref="editor" />
</template>

<script>
import Editor from 'tui-editor';

require('tui-editor/dist/tui-editor.css');
require('tui-editor/dist/tui-editor-contents.css');

export default {
  name: 'markdown_editor',
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      editor: null,
      markdown: '',
    };
  },
  mounted() {
    this.editor = new Editor({
      el: this.$refs.editor,
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      hideModeSwitch: true,
      height: `${this.height}px`,
      initialValue: this.value,
    });
    this.editor.on('change', () => {
      if(this.value !== this.editor.getValue()) {
        this.$emit('input', this.editor.getValue());
      }
    });
  },
};
</script>

<style lang="scss">
@import "general.scss";

.tui-editor-contents {
  @include p_large;
}
</style>
