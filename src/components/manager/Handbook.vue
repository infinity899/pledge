<template>
<div class="insights-handbook">
  <div class="handbook-header-wrap">
    <div class="handbook-header">
      <div class="handbook-title">
        {{ $t('manager.insights.handbook.header') }}
      </div>
      <div class="handbook-descript">
        {{ $t('manager.insights.handbook.descript') }}
      </div>
    </div>
    <div class="handbook-button" @click="showUnimplemented = true">
      {{ $t('manager.insights.handbook.view') }}
    </div>
  </div>
  <div class="handbook-items">
    <div v-for="(item, idx) in handbookItems" :key="idx" @click="showUnimplemented = true">
      <div class="handbook-img">
        <img :src="item.image">
      </div>
      <div>
        <div class="handbook-item-title">
          {{ item.title }}
        </div>
        <div class="handbook-item-info">
          {{ item.descript }}
        </div>
      </div>
    </div>
  </div>
  <div class="handbook-button-bottom">
    {{ $t('manager.insights.handbook.view') }}
  </div>
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import imgCraft from '@/static/img/art/craft_story.png';
import imgMovie from '@/static/img/art/make_movie.png';
import imgRewards from '@/static/img/art/choose_rewards.png';
import imgMilestones from '@/static/img/art/milestones.png';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'creator-handbook',
  components: {
    UnimplementedModal,
  },
  data() {
    return {
      showUnimplemented: false,
      imgCraft,
      imgMovie,
      imgRewards,
      imgMilestones,
      handbookItems: [
        {
          url: '',
          image: imgCraft,
          title: 'Crafting Your Story',
          descript: 'Learn how to describe your project and mission in a way that inspires and encourages pledges.',
        },
        {
          url: '',
          image: imgMovie,
          title: 'Making a Video',
          descript: 'How to make a video that grabs your backer\'s attention.',
        },
        {
          url: '',
          image: imgRewards,
          title: 'Choosing Your Rewards',
          descript: 'Select rewards that backers want and you can produce.',
        },
        {
          url: '',
          image: imgMilestones,
          title: 'Setting Milestones',
          descript: 'What do you need to do to ship your project? And when do you need to do it?',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.insights-handbook {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  border-top: 1px solid $border-light;
  .handbook-header-wrap {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .handbook-header {
      .handbook-title {
        @include h2;
        margin: 10px 0;
      }
      .handbook-descript {
        @include p_large;
        font-family: $font-title;
        margin: 0 30px 20px 0;
      }
    }
  }
  .handbook-items {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    > div {
      width: 22.5%;
      &:not(:last-child) {
        margin-right: 3.33%;
      }
      .handbook-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 200px;
        background-color: $orange-light;

        img {
          width: auto;
          height: 125px;
        }
      }
      .handbook-item-title {
        @include h4;
        margin-top: 24px;
      }
      .handbook-item-info {
        @include p_small;
        font-family: $font-title;
        margin: 4px 0;
      }
    }
  }
  .handbook-button, .handbook-button-bottom {
    @include button;
    margin-top: 32px;
    min-width: 135px;
    max-width: 140px;
  }
  @media (min-width: 481px) {
    .handbook-button-bottom {
      display: none;
    }
  }
  @media (max-width: $tablet-width-large) {
    .handbook-items > div {
      &:nth-child(n+3) {
        display: none;
      }
      width: 48%;
      &:not(:last-child) {
        margin-right: 4%;
      }
    }
  }
  @media (max-width: $mobile-width) {
    .handbook-header-wrap .handbook-header .handbook-descript {
      margin: 0 0 20px 0;
    }
    .handbook-items > div {
      &:not(:last-child) {
        margin-right: unset;
      }
      &:nth-child(n+2) {
        display: none;
      }
      width: 100%;
    }
    .handbook-button {
      display: none;
    }
  }
}

</style>
