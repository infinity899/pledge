<template>
<div class="about">
  <div class="about-title">
    <div class="about-title-text">
      {{ $t('about.title') }}
    </div>
    <div class="about-title-watch">
      <div
        class="about-title-button"
        @click="playVideo('DCBABbhNUfY')"
      >
        {{ $t('about.watch') }}
      </div>
      <div
        class="about-title-play"
        @click="playVideo('DCBABbhNUfY')"
      >
        <Play />
      </div>
    </div>
  </div>
  <div class="about-who container">
    <h3 class="about-who-title">
      {{ $t('about.who.title') }}
    </h3>
    <div class="about-who-content">
      <div class="about-who-section">
        <div class="about-who-left">
          <h3>{{ $t('about.who.mission') }}</h3>
          <div class="about-who-text">
            {{ $t('about.who.mission_text') }}
          </div>
        </div>
        <div class="about-who-planet">
          <img :src="require('@/static/img/about/planet2.png')">
        </div>
      </div>
      <div class="about-who-section">
        <div class="about-who-left about-who-explorer">
          <img :src="require('@/static/img/about/explorer.png')">
        </div>
        <div>
          <h3>{{ $t('about.who.history') }}</h3>
          <div
            class="about-who-text"
            v-html="$t('about.who.history_text')"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="about-featured-wrap">
    <div class="about-featured container">
      <div class="about-featured-title">
        {{ $t('about.featured') }}
      </div>
      <div class="about-featured-images">
        <img class="about-featured-forbes" :src="require('@/static/img/about/forbes.png')">
        <img class="about-featured-fox" :src="require('@/static/img/about/fox.png')">
        <img class="about-featured-crypto" :src="require('@/static/img/about/cryptolark.png')">
        <img class="about-featured-box" :src="require('@/static/img/about/boxmining.png')">
      </div>
    </div>
  </div>
  <div class="watch-wrap">
    <div class="watch container">
      <h3>{{ $t('about.watch_fox') }}</h3>
      <div
        class="about-video watch-fox-video"
        @click="playVideo('2pepv_roW64')"
      >
        <div class="about-video-play">
          <Play :sizeMultiple="2" />
        </div>
      </div>
    </div>
    <img class="watch-fox-image" :src="require('@/static/img/art/circle.png')">
  </div>
  <div class="about-connect-wrap">
    <div class="about-connect">
      <div class="about-connect-title">
        <h2>{{ $t('about.connect_title') }}</h2>
        <div class="about-connect-text">
          {{ $t('about.connect_text') }}
        </div>
      </div>
      <div class="about-connect-links">
        <div class="about-connect-links-row">
          <a target="_blank" href="https://t.me/pledgecamp">
            <div class="about-connect-link">
              <img :src="require('@/static/img/about/telegram.png')">
              <div>{{ $t('about.telegram') }}</div>
            </div>
          </a>
          <a id="twitter" href="https://twitter.com/pledgecamp" target="_blank">
            <div class="about-connect-link">
              <img :src="require('@/static/img/about/twitter.png')">
              <div>{{ $t('about.twitter') }}</div>
            </div>
          </a>
        </div>
        <div class="about-connect-links-row">
          <a target="_blank" href="https://medium.com/pledgecamp">
            <div class="about-connect-link">
              <img :src="require('@/static/img/about/medium.png')">
              <div>{{ $t('about.medium') }}</div>
            </div>
          </a>
          <a id="youtube" href="https://youtube.com/pledgecamp" target="_blank">
            <div class="about-connect-link">
              <img :src="require('@/static/img/about/youtube.png')">
              <div>{{ $t('about.youtube') }}</div>
            </div>
          </a>
          <a target="_blank" href="https://t.me/pledgecampkorea">
            <div class="about-connect-link">
              <img :src="require('@/static/img/about/telegram.png')">
              <div>{{ $t('about.telegram_kor') }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="watch-wrap">
    <div class="watch container">
      <h3>{{ $t('about.watch_advisors') }}</h3>
      <div
        class="about-video watch-advisors-video"
        @click="playVideo('wZ7e7ezC8uY')"
      >
        <div class="about-video-play">
          <Play :sizeMultiple="2" />
        </div>
      </div>
    </div>
    <img class="watch-advisors-image" :src="require('@/static/img/art/squiggle.png')">
  </div>
  <div class="advisors-wrap section">
    <div class="advisors">
      <h2>{{ $t('about.advisors') }}</h2>
      <div class="advisors-slider">
        <CarouselPrev @click="prevQuote" />
        <Slider
          v-model="quoteIndex"
          :autoplay="false"
          height="default"
          animation="fade"
        >
          <SliderItem
            v-for="(item, index) in $t('about.quotes')"
            :key="index"
          >
            <img class="advisors-quote" :src="require('@/static/img/about/quote.png')">
            <div class="advisors-text">
              {{ item.text }}
            </div>
            <div class="advisors-name">
              {{ item.name }}
            </div>
          </SliderItem>
        </Slider>
        <CarouselNext @click="nextQuote" />
      </div>
    </div>
  </div>
  <VideoModal
    :show="!!videoID"
    :onClose="() => { videoID = null; }"
    :videoID="videoID"
  />
</div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider';
import CarouselNext from '@/components/widget/CarouselNext.vue';
import CarouselPrev from '@/components/widget/CarouselPrev.vue';
import VideoModal from '@/components/widget/VideoModal.vue';
import Play from '@/components/svg/Play.vue';

export default {
  name: 'about',
  components: {
    CarouselNext,
    CarouselPrev,
    Slider,
    SliderItem,
    Play,
    VideoModal,
  },
  data() {
    return {
      videoID: null,
      quoteIndex: 0,
    };
  },
  computed: {
    quoteCount() {
      return this.$t('about.quotes').length;
    },
  },
  methods: {
    playVideo(url) {
      this.videoID = url;
    },
    nextQuote() {
      this.quoteIndex = (this.quoteIndex + 1) % this.quoteCount;
    },
    prevQuote() {
      if(this.quoteIndex === 0) {
        this.quoteIndex = this.quoteCount - 1;
      } else {
        this.quoteIndex -= 1;
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.about {
  .about-title {
    background-color: $main-black;
    height: 580px;
    background-image: url('../static/img/about/about_main.jpg');
    background-size: cover;
    background-position: 0% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .about-title-text {
      @include h1;
      color: white;
    }
    .about-title-watch {
      margin-top: 48px;
      display: flex;
      .about-title-button {
        @include button;
        padding: 22px 16px 17px;
      }
      .about-title-play {
        background-color: $main-black;
        margin-left: 4px;
        width: 41px;
        min-width: 41px;
        height: 41px;
        line-height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  .about-who {
    .about-who-title {
      margin: 72px 0 48px;
      text-align: center;
    }
    .about-who-section {
      margin-bottom: 96px;
      display: flex;
      align-items: center;
      > div {
        width: 45%;
        display: flex;
        flex-direction: column;
        p {
          margin: 24px 0 0 0;
        }
        .about-who-text {
          line-height: 1.5;
          padding-right: 24px;
          box-sizing: border-box;
        }
      }
      .about-who-planet > img {
        width: 90%;
      }
      .about-who-explorer {
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: 60%;
        }
      }
      .about-who-left {
        width: 55%;
        .about-who-text {
          max-width: 480px;
          margin-top: 24px;
        }
      }
    }
  }
  .about-featured-wrap {
    min-height: 150px;
    background-color: #f1f2f3;
  }
  .about-featured {
    display: flex;
    align-items: center;
    height: 100%;
    padding-top: 32px;
    padding-bottom: 32px;
    .about-featured-title {
      @include h2;
      min-width: 240px;
    }
    .about-featured-images {
      margin-left: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .about-featured-forbes {
        width: 124px;
        margin-right: 72px;
      }
      .about-featured-fox {
        width: 92px;
        margin-right: 70px;
      }
      .about-featured-crypto {
        width: 82px;
        margin-right: 68px;
      }
      .about-featured-box {
        width: 108px;
        margin-right: 64px;
      }
    }
  }
  .watch-wrap {
    position: relative;
    overflow: hidden;
    .watch {
      z-index: 10;
      position: relative;
      margin-bottom: 48px;
      h3 {
        text-align: center;
        margin-top: 72px;
        margin-bottom: 32px;
      }
    }
    .about-video {
      min-height: 520px;
      background-color: $main-black;
      max-width: 80%;
      margin: 0 auto;
      cursor: pointer;
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .about-video-play {
        background-color: $main-black;
        width: 64px;
        min-width: 64px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .watch-fox-image, .watch-advisors-image {
      z-index: 1;
    }
    .watch-fox-video {
      background-image: url('../static/img/about/fox_thumbnail.jpg');
    }
    .watch-fox-image {
      width: 200px;
      position: absolute;
      bottom: -120px;
      right: -100px;
    }
    .watch-advisors-video {
      background-image: url('../static/img/about/matt_thumbnail.jpg');
    }
    .watch-advisors-image {
      width: 200px;
      position: absolute;
      left: -88px;
      top: 48%;
    }
  }
  .about-connect-wrap {
    background-color: #f1f2f3;
    .about-connect {
      width: 76%;
      margin: 0 auto;
      padding: 48px 0;
      display: flex;
      align-items: center;
      .about-connect-title .about-connect-text {
        max-width: 300px;
      }
      .about-connect-links {
        width: 400px;
        margin-left: auto;
        .about-connect-links-row {
          &:first-child {
            width: 60%;
            margin-left: 20%;
            margin-bottom: 24px;
          }
          display: flex;
          justify-content: space-between;
          .about-connect-link {
            @include h4;
            text-align: center;
            min-width: 160px;
            > img {
              width: 72px;
              height: 72px;
            }
          }
        }
      }
    }
  }
  .advisors-wrap .advisors {
    width: 78%;
    margin: 0 auto 72px;
    text-align: center;
    h2 {
      margin-top: 48px;
    }
    .advisors-slider {
      display: flex;
      .slider {
        flex-grow: 1;
        height: 210px;
        overflow: visible;
        margin-bottom: 32px;
        .slider-indicators {
          bottom: -32px;
          .slider-indicator-icon {
            width: 32px;
            height: 5px;
            border-radius: unset;
            background-color: #f7c9bf;
            margin: 0 6px;
            &.slider-indicator-active {
              background-color: #eb4b2a;
            }
          }
        }
        .slider-btn {
          display: none;
        }
      }
      .advisors-quote {
        width: 14px;
        margin-top: 40px;
      }
      .advisors-text {
        @include p_large;
        font-weight: 600;
        margin: 0 auto;
        max-width: 500px;
        margin-top: 8px;
        padding: 0 16px;
      }
      .advisors-name {
        margin-top: 8px;
      }
      button {
        margin-top: 48px;
      }
    }
  }
  @media (max-width: $desktop-width) {
    .about-title {
      height: 480px;
    }
    .watch-wrap .about-video {
      min-height: 440px;
    }
  }
  @media (max-width: 976px) {
    .about-featured {
      flex-direction: column;
      .about-featured-title {
        min-width: unset;
      }
      .about-featured-images {
        margin-left: 48px;
        justify-content: space-around;
        > img {
          margin-right: 48px;
          margin-top: 24px;
        }
      }
    }
    .about-connect-wrap .about-connect {
      flex-direction: column;
      .about-connect-links {
        margin: 48px auto 0;
        width: unset;
      }
    }
  }
  @media (max-width: $tablet-width) {
    .about-who .about-who-section {
      flex-direction: column-reverse;
      margin-bottom: 48px;
      > div, .about-who-left {
        width: 100%;
        max-width: 480px;
      }
      h3 {
        margin-top: 24px;
      }
      .about-who-explorer > img {
        width: 80%;
        margin-top: 32px;
      }
    }
    .about-connect-wrap .about-connect .about-connect-links .about-connect-links-row {
      .about-connect-link {
        min-width: unset;
      }
      a:not(:last-child) .about-connect-link {
        margin-right: 32px;
      }
    }
    .watch-wrap .about-video {
      min-height: 360px;
    }
  }
  @media (max-width: $mobile-width) {
    .watch-wrap .about-video {
      min-height: 240px;
    }
    .advisors-wrap .advisors {
      width: 96%;
      .advisors-slider {
        .slider {
          height: 246px;
        }
        button {
          display: none;
        }
      }
    }
  }
}
</style>
