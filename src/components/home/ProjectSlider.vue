<template>
<div class="project-slider section">
  <div class="project-slider-header">
    <div class="project-slider-left">
      <h2 v-if="title" class="header-title">
        {{ title }}
      </h2>
      <div v-if="subTitle" class="p_large header-subtitle">
        {{ subTitle }}
      </div>
    </div>
    <div v-if="projects.length > 1" class="project-slider-right">
      <div class="prev-next">
        <CarouselPrev :disabled="currentPage == 0" @click="navigate('backward')" />
        <CarouselNext :disabled="currentPage === totalPages" @click="navigate('forward')" />
      </div>
      <button
        v-if="showViewAll"
        class="btn-view-all"
        @click="$emit('viewAll')"
      >
        {{ $t('project.view_all') }}
      </button>
    </div>
  </div>
  <Spinner v-if="loading" :size="48" />
  <Carousel
    v-else
    ref="carousel"
    :scrollPerPage="true"
    :paginationEnabled="false"
    :perPage="perPage"
    @page-change="handlePageChange"
  >
    <Slide v-for="(project, index) in projects" :key="index">
      <ProjectItem :project="project" :funded="funded" />
    </Slide>
  </Carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import ProjectItem from '@/components/widget/ProjectItem.vue';
import CarouselNext from '@/components/widget/CarouselNext.vue';
import CarouselPrev from '@/components/widget/CarouselPrev.vue';
import Spinner from '@/components/widget/Spinner.vue';

export default {
  name: 'project-slider',
  components: {
    ProjectItem,
    Carousel,
    CarouselNext,
    CarouselPrev,
    Slide,
    Spinner,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    showViewAll: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    funded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: 0,
      perPage: 4,
      totalPages: 1,
      resizeTimeout: -1,
    };
  },
  methods: {
    navigate(direction) {
      if(this.$refs.carousel) {
        this.$refs.carousel.handleNavigation(direction);
      }
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    calcTotalPages() {
      if(this.$refs.carousel) {
        const carouselWidth = this.$refs.carousel.getCarouselWidth();
        this.perPage = carouselWidth / 367;
        this.totalPages = Math.floor(this.projects.length / this.perPage);
      } else {
        this.totalPages = 0;
      }
    },
    onResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.calcTotalPages, 400);
    },
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
    this.calcTotalPages();
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.project-slider {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  max-width: 1440px;
  width: 100%;

  .VueCarousel {
    overflow: hidden;

    .VueCarousel-wrapper {
      width: calc(100% + 50px);

      .VueCarousel-inner {
        flex-basis: 347px !important;

        .VueCarousel-slide {
          flex-basis: 347px !important;
        }
      }
    }
  }
  .project-slider-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: flex-end;

    .header-title {
      margin: 0;
    }
  }

  .project-slider-right {
    display: flex;
    align-items: center;
    z-index: 1;

    .prev-next {
      margin-right: 80px;

      .btn-next {
        margin-left: 15px;
      }
    }

    .btn-view-all {
      @include black-button;
    }
  }

  @media (max-width: $tablet-width) {
    .project-slider-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .project-slider-right {
      .prev-next {
        display: none;
      }
      .btn-view-all {
        @include link;
        margin-top: 10px;
      }
    }
  }
}
</style>
