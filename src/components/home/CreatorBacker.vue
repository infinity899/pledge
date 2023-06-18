<template>
<div class="container">
  <div class="creator-backer-content section">
    <div class="creator">
      <img :src="require('@/static/img/art_icons/creators_small.png')">
      <div>
        <h1>{{ $t('home.creator_backer_title1') }}</h1>
        <p class="p_large">
          {{ $t('home.creator_backer_desc1') }}
        </p>
      </div>
    </div>
    <div class="backer">
      <img :src="require('@/static/img/art_icons/backers1_small.png')">
      <div>
        <h1>{{ $t('home.creator_backer_title2') }}</h1>
        <p class="p_large">
          {{ $t('home.creator_backer_desc2') }}
        </p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'creator-backer',
};
</script>

<style lang="scss">
@import 'general.scss';

.creator-backer-content {
  background-color: $section-highlight;
  display: flex;
  justify-content: space-around;
  padding: 100px 0;

  h1 {
    margin: 0;
  }

  .creator,
  .backer {
    margin: 0 20px;

    img {
      height: 60px;
      width: 60px;
      margin-bottom: 20px;
    }

    p {
      max-width: 450px;
    }
  }

  @media (max-width: $tablet-width) {
    flex-direction: column;

    .creator,
    .backer {
      display: flex;
      padding-left: 50px;

      img {
        margin-right: 30px;
      }

      h1 {
        @include h2;
      }
    }

    .creator {
      margin-bottom: 50px;
    }
  }

  @media (max-width: $mobile-width) {
    align-items: center;
    padding: 80px 0;

    .creator,
    .backer {
      flex-direction: column;
      padding-left: 0;
    }
  }
}
</style>
