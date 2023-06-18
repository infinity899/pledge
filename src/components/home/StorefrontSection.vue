<template>
<div class="container">
  <div class="storefront-section-content section">
    <img :src="require('@/static/img/art_icons/storefront_idea_small.png')">
    <div class="text">
      <div class="left">
        <h1>{{ $t('home.storefront_title') }}</h1>
      </div>
      <div class="right">
        <p class="p_large">
          {{ $t('home.storefront_desc1') }}
        </p>
        <router-link to="/storefront/create">
          {{ $t('home.storefront_link1') }}
        </router-link>
        <p class="p_large text-bottom">
          {{ $t('home.storefront_desc2') }}
        </p>
        <router-link to="/create">
          {{ $t('home.start_project') }}
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'storefront-section',
};
</script>

<style lang="scss">
@import 'widgets.scss';
@import 'general.scss';

.storefront-section-content {
  background-color: $section-highlight;
  padding: 72px 70px 60px;

  img {
    position: relative;
    width: 117px;
    height: 83px;
    left: 2%;
    bottom: 12px;
  }

  .text {
    display: flex;
    justify-content: space-around;

    .left {
      margin: 0 20px;

      h1 {
        max-width: 500px;
        margin-top: 0;
      }
    }
    .right {
      margin: 0 20px;

      p {
        max-width: 450px;
        margin: 0 0 10px;
        &.text-bottom {
          margin-top: 20px;
        }
      }

      a {
        @include link;
        color: $main-blue;
      }
    }
  }

  @media (max-width: $tablet-width-large) {
    padding: 70px 44px 60px;
    .text {
      flex-direction: column;

      .right {
        p {
          max-width: 700px;
        }
      }
    }
  }

  @media (max-width: $mobile-width) {
    padding: 50px 0 100px;

    .left {
      h1 {
        @include h2;
      }
    }
    .right {
      p {
        @include p_small;
      }
    }
  }
}
</style>
