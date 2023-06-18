<template>
<div class="question-content">
  <div v-if="question" class="question-listitem-wrap">
    <div class="question-listitem-title">
      {{ question.title }}
    </div>
    <div class="question-listitem-info">
      {{ $t('learn.questions.last_activity', question.edited) }}
    </div>
    <div class="question-listitem">
      <div
        class="question-listitem-user-image"
        :style="{ 'background-image': 'url()' }"
      />
      <div class="question-listitem-data">
        <div class="question-listitem-user" />
        <div class="question-listitem-description">
          {{ question.description }}
        </div>
      </div>
      <div class="question-listitem-votes learn-votes">
        <div class="learn-downvote-wrap">
          <div class="learn-downvote-image" />
          <div class="learn-downvotes">
            {{ question.upvotes }}
          </div>
        </div>
        <div class="learn-upvote-wrap">
          <div class="learn-upvote-image" />
          <div class="learn-upvotes">
            {{ question.upvotes }}
          </div>
        </div>
      </div>
    </div>
    <div class="question-listitem-break" />
  </div>
</div>
</template>

<script>
import * as api from '@/utils/api';

export default {
  name: 'question',
  data() {
    return {
      question: null,
    };
  },
  methods: {
    getQuestion() {
      api.getQuestionDetail(this.$route.params.id)
        .then((res) => {
          const { question } = res.data;
          this.question = question;
        });
    },
  },
  created() {
    this.getQuestion({ questionId: this.$route.params.id });
  },
};
</script>

<style lang="scss" scoped>

.orange {
  color: $main-orange;
}
.question-listitem-wrap {
  cursor: pointer;
  box-sizing: border-box;
  padding-top: 28px;
  position: relative;
  &:hover {
    background-color: $grey-light;
  }
  > a {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
  }
}
.question-listitem-title {
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 12px;
}
.question-listitem-info {
  font-size: 0.9em;
  margin-top: 8px;
  color: $grey;
}
.question-listitem {
  width: 100%;
  height: 180px;
  margin-bottom: 28px;
  margin-top: 10px;
  > div {
    position: relative;
    float: left;
  }
}
.question-listitem-user-image {
  width: 10%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.question-listitem-data {
  width: 75%;
  box-sizing: border-box;
  padding: 0 16px;
  text-align: left;
}
.question-listitem-user {
  font-size: 1.1em;
  font-weight: 600;
  > span {
    color: $main-blue;
  }
}
.question-listitem-description {
  margin-top: 8px;
  font-size: 0.9em;
}
</style>
