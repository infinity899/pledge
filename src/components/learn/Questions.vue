<template>
<div class="content">
  <div id="options">
    <div
      v-for="(option, index) in $t('learn.questions.filters')"
      :key="index"
      :class="index == selectedOption ? 'selected' : ''"
      @click="setOption(index)"
    >
      {{ option.title }}
    </div>
  </div>
  <div id="questions">
    <div
      v-if="questions.length == 0"
      class="questions-spinner"
    />
    <div
      v-for="question in questions"
      :key="question.id"
      class="question"
    >
      <QuestionListItem :question="question" />
    </div>
  </div>
</div>
</template>

<script>
import QuestionListItem from '@/components/learn/QuestionListItem.vue';
import * as api from '@/utils/api';

export default {
  name: 'questions',
  components: {
    QuestionListItem,
  },
  data() {
    return {
      selectedOption: 0,
      questions: [],
    };
  },
  methods: {
    getQuestions(filter) {
      api.getQuestions(filter)
        .then((res) => {
          const { questions } = res.data;
          this.questions = questions;
        });
    },
    setOption(index) {
      this.selectedOption = index;
      const { filter } = this.$t('learn.questions.filters')[index];
      if(filter) {
        this.getQuestions(filter);
      }
    },
  },
  created() {
    this.setOption(this.selectedOption);
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

#questions {
  width: 640px;
  max-width: 100%;
  margin: 0 auto;
  text-align: left;
  > div {
    margin: 24px auto 0 auto;
  }
}
#options {
  @include underline-list;
  margin-top: 32px;
  text-align: center;
}
.questions-spinner {
  @include spinner;
}

@media (max-width: 680px) {
  #questions {
    box-sizing: border-box;
    padding: 0 5%;
  }
}
</style>
