<template>
<div class="images-upload">
  <div class="images-header">
    {{ title }}
  </div>
  <div class="images-list">
    <div
      v-for="(imgData, idx) in images"
      :key="idx"
    >
      <div class="thumbnail-wrap">
        <img :src="imgData.url" class="thumbnail-img">
        <svg
          class="img-delete"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          @click="handleDelete(imgData, idx)"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        <div class="overlay" />
      </div>
    </div>
    <ImageUpload
      v-if="images.length < 7"
      @imageSelect="handleUpload($event)"
    />
  </div>
</div>
</template>

<script>
import ImageUpload from '@/components/widget/ImageUpload.vue';
import { uploadProjectImage, deleteProjectImage } from '@/utils/api';

export default {
  name: 'image-list',
  components: {
    ImageUpload,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    value: {
      type: Array,
      default: () => [],
    },
    projectId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      images: [],
    };
  },
  watch: {
    images(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    handleUpload(file) {
      const { projectId } = this;
      const isHeader = false;
      uploadProjectImage({
        projectId,
        file,
        isHeader,
      })
        .then((resp) => {
          const imgData = resp.data.resource;
          const images = [...this.images, imgData];
          this.images = images;
        })
        .catch((err) => {
          console.log('image upload err: ', err);
        });
    },
    handleDelete(imgData, idx) {
      const { projectId } = this;
      const imageId = imgData.id;
      deleteProjectImage({
        projectId,
        imageId,
      })
        .then(() => {
          const images = [...this.images.slice(0, idx), ...this.images.slice(idx + 1)];
          this.images = images;
        })
        .catch((err) => {
          console.log('image delete err: ', err);
        });
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.images-upload {
  width: 100%;
}
.images-header {
  margin: 20px 0 10px;
  font-weight: 600;
}
.images-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
  @media (max-width: 480px) {
    margin: 0 -10px;
  }
}
.thumbnail-wrap {
  width: 150px;
  height: 100px;
  margin: 0 8px 15px;
  position: relative;
  display: inline-block;
  > img {
    width: 100%;
    height: 100%;
  }

  .img-delete {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
    z-index: 100;
    cursor: pointer;
    fill: white;
  }
  &:hover {
    transition: 0.3s;
    .overlay {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      left: 0;
      background-color: #000;
      opacity: 0.1;
      z-index: 10;
      display: block;
    }
    .img-delete {
      display: block;
    }
  }
}

</style>
