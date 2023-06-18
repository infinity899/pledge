<template>
<div class="p-image-carousel">
  <div class="images">
    <Carousel
      ref="carousel"
      :scrollPerPage="false"
      :paginationEnabled="false"
      :perPage="1"
      :navigateTo="activeSide"
      @page-change="handlePageChange"
    >
      <Slide v-for="(image, index) in images" :key="index">
        <div class="image-wrap">
          <img :src="image.url">
        </div>
      </Slide>
    </Carousel>
    <div class="nav-buttons">
      <CarouselNext :disabled="activeSide >= images.length - 1" @click="navigate('forward')" />
      <CarouselPrev :disabled="activeSide == 0" @click="navigate('backward')" />
    </div>
  </div>
  <div class="thumbnails">
    <div
      v-for="(image, index) in images"
      :key="index"
      :class="{'thumbnail-wrap': true, 'active-slide': index === activeSide}"
      :style="{ 'background-image': `url(${image.url})` }"
      @click="handleSelectThumb(index)"
    />
  </div>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import CarouselNext from '@/components/widget/CarouselNext.vue';
import CarouselPrev from '@/components/widget/CarouselPrev.vue';

export default {
  name: 'image-carousel',
  components: {
    Carousel,
    CarouselNext,
    CarouselPrev,
    Slide,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeSide: 0,
    };
  },
  methods: {
    navigate(direction) {
      if(this.$refs.carousel) {
        this.$refs.carousel.handleNavigation(direction);
      }
    },
    handlePageChange(activeSide) {
      this.activeSide = activeSide;
    },
    handleSelectThumb(index) {
      this.activeSide = index;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-image-carousel {
  .images {
    position: relative;

    .VueCarousel {
      max-width: 900px;

      .VueCarousel-wrapper {
        overflow: visible;
      }
    }

    .image-wrap {
      height: 492px;
      margin-right: 24px;
      position: relative;
      overflow: hidden;

      > img {
        min-width: 100%;
        min-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

    .nav-buttons {
      position: absolute;
      top: 32px;
      right: 32px;
      display: flex;
      flex-direction: column;

      .btn-prev, .btn-next {
        margin-bottom: 15px;

        &:enabled {
          background: rgba($white, 0.75) !important;
          border-color: rgba($white, 0.75) !important;
        }
      }
    }
  }

  .thumbnails {
    display: flex;
    flex-direction: row;
    margin-top: 24px;

    .thumbnail-wrap {
      width: 115px;
      min-width: 115px;
      height: 65px;
      margin-right: 24px;
      opacity: 0.4;
      transition: all 0.2s;
      cursor: pointer;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% auto;

      &:hover {
        opacity: 0.6;
      }

      &.active-slide {
        opacity: 1;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media (max-width: $desktop-width-small) {
    .images {
      .VueCarousel {
        max-width: 692px;
      }

      .image-wrap {
        margin-right: 22px;
        height: 376px;
      }

      .nav-buttons {
        display: none;
      }
    }
  }

  @media (max-width: $tablet-width) {
    .images {
      .VueCarousel {
        max-width: 272px;
      }

      .image-wrap {
        margin-right: 16px;
        height: 181px;
      }
    }

    .thumbnails {
      display: none;
    }
  }
}
</style>
