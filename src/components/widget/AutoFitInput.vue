<template>
<textarea
  class="p-auto-fit-input"
  rows="1"
  :placeholder="placeholder"
  :value="value"
  v-on="listeners"
/>
</template>

<script>

const DEFAULT_HEIGHT = 44;

export default {
  name: 'auto-fit-input',
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit('input', e.target.value);
        },
      };
    },
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.resize();
      });
    },
  },
  methods: {
    resize() {
      this.$el.style.setProperty('height', 'auto');

      let height = this.$el.scrollHeight + 1;
      if(height < DEFAULT_HEIGHT) {
        height = DEFAULT_HEIGHT;
      }
      this.$el.style.setProperty('height', `${height}px`);
    },
  },
  mounted() {
    this.resize();
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-auto-fit-input {
  @include p_small;
  width: 100%;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 8px 72px 8px 0;
  vertical-align: top;
}
</style>
