<template>
<div class="home-intro container section">
  <div class="left">
    <h1>{{ $t('home.intro_title') }}</h1>
    <div class="intro">
      <div class="intro-video" @click="toggleVideoModal">
        <div class="video-poster" />
        <div class="video-desc">
          <span class="btn-play">
            <Play />
          </span>
          <span class="h5 desc-label">{{ $t('home.intro_video_desc') }}</span>
        </div>
      </div>
      <div class="p_large intro-desc" v-html="$t('home.intro_desc')" />
    </div>
  </div>
  <div class="right">
    <img :src="require('@/static/img/art/home.png')" alt="Pledgecamp Crowdfunding">
  </div>
  <VideoModal :show="showVideoModal" :onClose="toggleVideoModal" />
</div>
</template>

<script>
import VideoModal from '@/components/widget/VideoModal.vue';
import Play from '@/components/svg/Play.vue';

export default {
  name: 'home-intro',
  components: {
    VideoModal,
    Play,
  },
  data() {
    return {
      showVideoModal: false,
    };
  },
  methods: {
    toggleVideoModal() {
      this.showVideoModal = !this.showVideoModal;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
@import 'general.scss';

#app .home .home-intro {
  display: flex;
  align-items: flex-end;
  margin-top: 0;
  margin-bottom: 0;

  .left {
    max-width: 632px;
    margin-left: 8%;
    margin-right: 6%;

    h1 {
      font-size: 52px;
      line-height: 60px;
      margin-top: 0;
      margin-bottom: 35px;
    }

    .intro {
      display: flex;

      .intro-video {
        position: relative;
        width: fit-content;
      }

      .video-poster {
        width: 217px;
        height: 117px;
        background: url('../../static/img/video-poster.jpg');
        background-position-x: center;
        background-position-y: 0;
        background-size: cover;
        cursor: pointer;
      }

      .video-desc {
        position: absolute;
        left: calc(100% - 33px);
        bottom: 0;
        background: $blue-med;
        height: 33px;
        width: auto;
        display: flex;
        align-items: center;
        cursor: pointer;

        .btn-play {
          width: 33px;
          min-width: 33px;
          height: 33px;
          background: $main-blue;
          line-height: 33px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .desc-label {
          padding: 0 16px 0 24px;
          color: $main-blue;
          white-space: nowrap;
        }
      }

      .intro-desc {
        margin-left: 24px;
      }
    }
  }
  .right img {
    max-width: 311px;
  }

  @media (max-width: 1100px) {
    .left {
      margin-left: 2%;
      margin-right: 0;
      .intro .video-poster {
        width: 160px;
      }
    }
    .right img {
      width: 90%;
    }
  }

  @media (max-width: $tablet-width-large) {
    .left {
      max-width: $mobile-width;
      margin: auto;

      h1 {
        @include h1;
      }

      .intro {
        flex-direction: column-reverse;
        width: 100%;

        .intro-desc {
          margin-left: 0;
          margin-bottom: 20px;
        }
      }
    }
    .right {
      display: none;
    }
  }

  @media (max-width: $mobile-width) {
    .left {
      .intro {
        .intro-video {
          width: unset;
        }

        .video-poster {
          width: 100%;
        }

        .video-desc {
          position: unset;
          .desc-label {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
