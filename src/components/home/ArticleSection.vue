<template>
<div class="container">
  <div class="article-section-content section">
    <div class="art-wrap">
      <img :src="require('@/static/img/art_icons/stars.png')">
    </div>
    <h3>{{ $t('home.article.title') }}</h3>
    <div class="articles">
      <div v-for="(article, index) in $t('home.article.articles')" :key="index">
        <div class="article-image-wrap">
          <img :src="getImage(article.image)">
        </div>
        <p class="p_large">
          {{ article.text }}
        </p>
        <a :href="article.link" target="_blank">{{ article.link_text }}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'article-section',
  methods: {
    getImage(url) {
      return require(`../../static/img/articles/${url}`); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';
@import 'general.scss';

#app .home .article-section-content {
  background-color: $section-highlight;
  padding-left: 96px;
  padding-right: 96px;
  overflow: visible;
  position: relative;

  .art-wrap {
    position: absolute;
    right: -8px;
    top: -64px;

    img { width: 172px; }
  }

  .articles {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 38px;

    > div {
      max-width: 28%;
      .article-image-wrap {
        height: 80px;
        display: flex;
        align-items: center;
      }
      &:nth-child(1) img {
        height: 36px;
      }
      &:nth-child(2) img {
        height: 50px;
      }
      &:nth-child(3) img {
        height: 72px;
      }
      a {
        @include button_small_text;
        color: $main-blue;
      }
    }
  }

  @media (max-width: $tablet-width-large) {
    padding: 32px 0 80px 120px;
    .articles {
      flex-direction: column;
      > div {
        max-width: 75%;
        &:not(:first-child) {
          margin-top: 32px;
        }
      }
    }
  }

  @media (max-width: $mobile-width) {
    padding: 32px 0 80px 48px;
    .articles {
      > div {
        max-width: 90%;
      }
    }
  }
}
</style>
