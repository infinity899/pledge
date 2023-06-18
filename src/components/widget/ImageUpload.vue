<template>
<div class="img-upload-wrap">
  <form
    :id="id"
    class="img-upload-form"
    action=""
    enctype="multipart/form-data"
    @drop="dropUploadImage"
    @dragover="dropUploadDrag"
    @input="handleSelect"
  >
    <label class="img-upload-area" :for="`image-upload-input${id}`">
      <slot />
      <div
        v-if="backgroundImage"
        class="img-upload-background"
        :style="{'background-image': `url(${backgroundImage})`}"
      />
      <div class="img-upload-button">
        <Upload :color="'#2E40EA'" />
        <h4>{{ $t('widgets.image_upload.drag_drop') }}</h4>
        <div>{{ $t('widgets.image_upload.browse_file') }}</div>
      </div>
    </label>
    <input
      :id="`image-upload-input${id}`"
      class="img-upload"
      type="file"
      accept="image/*"
      :disabled="isDisabled"
    >
  </form>
</div>
</template>

<script>
import Upload from '@/components/svg/Upload.vue';

export default {
  name: 'img-upload',
  components: {
    Upload,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    backgroundImage: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleSelect(e) {
      if(e.type === 'input') {
        const file = e.target.files[0];
        this.$emit('imageSelect', file);
      } else if(e.type === 'drop') {
        const file = e.dataTransfer.files[0];
        this.$emit('imageSelect', file);
      }
    },
    dropUploadDrag(e) {
      e.preventDefault();
    },
    dropUploadImage(e) {
      e.preventDefault();
      this.handleSelect(e);
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.img-upload-wrap {
  border: 1px dashed $border-light;
}
.img-upload-form {
  height: 100%;
  width: 100%;
}
.img-upload-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.img-upload {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.img-upload + label * {
  pointer-events: none;
}
.img-upload-button {
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  z-index: 10;
  background: rgba($white, 0.8);
  position: absolute;
  width: 100%;
  height: 100%;

  h4 {
    margin-top: 16px;
  }

  div {
    color: $main-blue;
    @include button_small_text;
    margin-top: 8px;
  }
}
</style>
