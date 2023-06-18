<template>
<transition
  name="fade"
  @before-enter="onBeforeEnter"
  @after-enter="onAfterEnter"
>
  <div v-show="show" class="video-modal" @keydown.esc="onClose">
    <div class="video-modal-content">
      <transition name="slide-fade">
        <button v-show="showCloseButton" class="btn-close" @click="onClose">
          <span>{{ $t('close') }}</span>
          <img :src="require('@/static/img/ic_close.svg')">
        </button>
      </transition>
      <youtube
        ref="youtube"
        :video-id="videoID"
        :resize="true"
        @ended="onClose()"
      />
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'video-modal',
  props: {
    show: Boolean,
    onClose: {
      type: Function,
      default: () => {},
    },
    videoID: {
      type: String,
      default: 'DCBABbhNUfY',
    },
  },
  data() {
    return {
      showCloseButton: false,
    };
  },
  watch: {
    show(newVal) {
      if(newVal) {
        window.addEventListener('keyup', this.escapeListener);
        this.$nextTick(() => {
          this.$refs.youtube.player.playVideo();
        });
      } else {
        window.removeEventListener('keyup', this.escapeListener);
        this.$refs.youtube.player.stopVideo();
      }
    },
  },
  methods: {
    onBeforeEnter() {
      this.showCloseButton = false;
    },
    onAfterEnter() {
      this.showCloseButton = true;
    },
    escapeListener(event) {
      if(event.keyCode === 27) {
        this.onClose();
      }
    },
  },
};
</script>

<style lang="scss">
@import 'globals.scss';

.video-modal {
  position: fixed;
  background: rgba(255, 255, 255, 0.9);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;

  .video-modal-content {
    width: 75%;
    top: 12%;
    margin: auto;
    position: relative;

    .btn-close {
      font-family: $font-title;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
      position: absolute;
      top: -40px;
      right: 0;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      span {
        margin-right: 10px;
      }

      img {
        vertical-align: middle;
      }
    }

    iframe {
      background: $main-black;
      width: 100%;
      height: 42.2vw;
      max-height: 80vh;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translate(50%);
    opacity: 1;
  }

  @media (max-width: $mobile-width) {
    .video-modal-content {
      width: 100%;
      .btn-close {
        font-family: $font-title;
        font-size: 20px;
        margin-right: 16px;
        img {
          width: 14px;
          height: 14px;
          position: relative;
          bottom: 2px;
        }
      }
      iframe {
        height: 56.3vw;
      }
    }
  }
}
</style>
