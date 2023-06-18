<template>
<div class="container">
  <div v-if="project" class="checkout-success">
    <div class="pledge-header">
      <h1>{{ $t('checkout.success.congrats') }}</h1>
      <h3>{{ $t('checkout.success.just_pledged') }}</h3>
      <div class="animation">
        <!-- TODO: Split the image into pieces of icons and add animation -->
        <img :src="require('@/static/img/art/pledge_success.png')">
      </div>
    </div>
    <div class="pledge-info">
      <h3 class="item-title">
        {{ project.name }}
      </h3>
      <div class="item-image" :style="{ backgroundImage: `url(${project.main_image.url})`}" />
    </div>
    <div class="next-tip">
      <div class="tip-content">
        <h4>{{ $t('checkout.success.whats_next') }}</h4>
        <p>{{ $t('checkout.success.whats_next_desc') }}</p>
      </div>
      <div class="tip-content">
        <h4>{{ $t('checkout.success.voting') }}</h4>
        <p>{{ $t('checkout.success.voting_desc') }}</p>
      </div>
      <div class="tip-content social-share">
        <button class="btn-social fb-share">
          <span>{{ $t('checkout.buttons.share_facebook') }}</span>
          <img class="social-icon" :src="require('@/static/img/icons/ic_facebook.png')">
        </button>
        <button class="btn-social twitter-share">
          <span>{{ $t('checkout.buttons.share_twitter') }}</span>
          <img class="social-icon" :src="require('@/static/img/icons/ic_twitter_white.svg')">
        </button>
      </div>
    </div>
    <button class="btn-done" @click="$emit('done')">
      {{ $t('checkout.buttons.done') }}
    </button>
  </div>
</div>
</template>

<script>
import { getProjectDetail } from '@/utils/api';

export default {
  name: 'checkout-success',
  data() {
    return {
      project: undefined,
    };
  },
  methods: {
    async getProjectData() {
      this.project = await getProjectDetail(this.$route.params.id);
    },
  },
  mounted() {
    this.getProjectData();
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.checkout-success {
  max-width: 530px;
  margin: 56px auto;
  .pledge-header {
    padding: 48px 0;
    text-align: center;
    position: relative;
    h1 {
      margin-bottom: 16px;
    }
    .animation {
      position: absolute;
      left: 60px;
      top: -5px;
      img {
        width: 420px;
        height: 200px;
      }
    }
  }
  .pledge-info {
    margin-bottom: 40px;
    .item-image {
      height: 300px;
      background-color: #aaa;
      background-position: center;
      background-size: cover;
    }
  }
  h2, h3, .tip-content {
    margin-bottom: 40px;
  }
  .social-share {
    display: flex;
    justify-content: space-between;
    margin-top: 48px;
  }
  .btn-social {
    width: 250px;
    display: flex;
    &.fb-share {
      @include button($facebook-blue, large);
      padding: 0 16px;
    }
    &.twitter-share {
      @include button($twitter-blue, large);
      padding: 0 16px;
    }
    .social-icon {
      width: 25px;
      margin-left: auto;
    }
  }
  .btn-done {
    @include button($main-black, full);
    margin-top: 48px;
  }
}
</style>
