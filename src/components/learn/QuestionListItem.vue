<template>
<div class="question-listitem-wrap">
  <div class="question-listitem-votes">
    <div class="learn-vote-wrap">
      <div
        class="learn-vote-image"
        :style="{ 'background-image': `url(${thumbsdownImg})` }"
      />
      <div class="learn-votes">
        {{ question.downvotes }}
      </div>
    </div>
    <div class="learn-vote-wrap">
      <div
        class="learn-vote-image"
        :style="{ 'background-image': `url(${thumbsupImg})` }"
      />
      <div class="learn-votes">
        {{ question.upvotes }}
      </div>
    </div>
  </div>
  <div class="question-listitem">
    <div class="question-listitem-title">
      <router-link
        :to="{name: 'question', params: {id: question.id}}"
      >
        {{ question.title }}
      </router-link>
    </div>
    <div class="question-listitem-info">
      <!-- eslint-disable vue-i18n/no-raw-text -->
      {{ question.user_name }} | {{ question.edited }}
      <!-- eslint-enable vue-i18n/no-raw-text -->
    </div>
    <div class="question-listitem-data-wrap">
      <div class="question-listitem-data">
        <div class="question-listitem-user" />
        <div class="question-listitem-description">
          {{ question.description }}
        </div>
      </div>
    </div>
  </div>
  <div class="question-listitem-break" />
</div>
</template>

<script>
import thumbsupImg from '@/static/img/thumbsup.png';
import thumbsdownImg from '@/static/img/thumbsdown.png';

export default {
  name: 'question-listitem',
  props: {
    question: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      thumbsupImg,
      thumbsdownImg,
    };
  },
};
</script>

<style lang="scss">

.orange {
  color: $main-orange;
}
.question-listitem-wrap {
  box-sizing: border-box;
  padding-top: 18px;
  position: relative;
}
.question-listitem {
  width: 79%;
  display: inline-block;
}
.question-listitem-title {
  font-size: 1.2em;
  font-weight: 600;
}
.question-listitem-info {
  font-size: 0.8em;
  margin-top: 8px;
  color: $grey;
}
.question-listitem-data-wrap {
  width: 100%;
  margin-bottom: 16px;
  margin-top: 10px;
}
.question-listitem-data {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  font-size: 1.1em;
}
.question-listitem-user {
  font-weight: 600;
  > span {
    color: $main-blue;
  }
}
.question-listitem-description {
  margin-top: 8px;
  font-size: 0.9em;
}
.question-listitem-votes {
  width: 21%;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  padding-top: 2px;
  padding-right: 20px;
}
.learn-vote-wrap {
  position: relative;
  float: right;
  box-sizing: border-box;
  &:first-child {
    padding-left: 24px;
  }
}
.learn-vote-image {
  width: 32px;
  height: 32px;
  background-size: contain;
  background-repeat: no-repeat;
}
.learn-votes {
  color: #9f9f9f;
  text-align: center;
  box-sizing: border-box;
  padding-top: 4px;
}

@media (max-width: 680px) {

  .learn-vote-image {
    width: 24px;
    height: 24px;
  }
}
</style>
