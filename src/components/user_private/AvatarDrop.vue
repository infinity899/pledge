<template>
<div class="avatar-drop">
  <slot />
  <form
    class="drop-panel"
    :class="dragClass"
    action=""
    enctype="multipart/form-data"
    @dragover="handleDragover"
    @drop="handleDrop"
    @input="handleSelect"
    @dragleave="dragClass = ''"
  >
    <input
      id="drop-input"
      type="file"
      accept="image/*"
    >
    <label class="drop-label" for="drop-input" />
  </form>
</div>
</template>

<script>
// TODO: add fallbacks for older browsers

export default {
  name: 'avatar-drop',
  data() {
    return {
      dragClass: '',
    };
  },
  methods: {
    handleDragover(e) {
      e.preventDefault();
      this.dragClass = 'drag-over';
    },
    handleDrop(e) {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const type = 'image/*';
      if(file.type.match(type)) { // TODO: display error if wrong file type?
        this.handleUpload(file);
      }
      this.dragClass = '';
    },
    handleSelect(e) {
      const file = e.target.files[0];
      this.handleUpload(file);
    },
    handleUpload(file) {
      this.$emit('input', file);
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
.avatar-drop {
  width: 100%;
  height: 100%;
  position: relative;
  #drop-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
  }
  .drop-label {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 11;
    cursor: pointer;
  }

  .drop-panel {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 10;
  }
  .drag-over {
    background-color: $grey-light;
  }
}
</style>
