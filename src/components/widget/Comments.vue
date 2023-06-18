<template>
<div class="comments">
  <div class="title">
    <span>{{ title }}</span>
    <div class="sort-options">
      <span
        v-for="(s, index) in $t('comments.sortOptions')"
        :key="index"
        :class="{'option': true, 'selected': sortBy === s.option}"
        @click="() => { onChangeSortOption(s.option); }"
      >
        {{ s.label | uppercase }}
      </span>
    </div>
  </div>
  <div v-if="commentPermission" class="reply-box-wrap">
    <ReplyBox
      :parentId="replyingParentId"
      :onSubmit="onAddComment"
      :commentPlaceholder="$t('comments.writeComment')"
    />
  </div>
  <!-- eslint-disable vue-i18n/no-raw-text -->
  <div v-else class="tip">
    {{ $t('comments.commentTip.desc') }} <span @click="pledgeClicked">{{ $t('comments.commentTip.link') }}</span>.
  </div>
  <!-- eslint-enable vue-i18n/no-raw-text -->
  <Comment
    v-for="(comment, index) in comments"
    :key="index"
    :project="project"
    :creator="creator"
    :initialComment="comment"
    :commentPermission="commentPermission"
  />
</div>
</template>

<script>
import * as api from '@/utils/api';

import Comment from '@/components/widget/Comment.vue';
import ReplyBox from '@/components/widget/ReplyBox.vue';

export default {
  name: 'comments',
  components: {
    Comment,
    ReplyBox,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    project: {
      type: Object,
      default: null,
    },
    commentPermission: Boolean,
  },
  data() {
    return {
      replyingParentId: 0,
      comments: [],
      sortBy: this.$t('comments.sortOptions')[0].option,
    };
  },
  computed: {
    creator() {
      if(this.project && this.project.creator) {
        return this.project.creator;
      }
      return undefined;
    },
  },
  methods: {
    pledgeClicked() {
      this.$emit('goToPledge');
    },
    getComments() {
      if(this.project && this.project.comment_root_id) {
        api.getCommentReplies({ commentId: this.project.comment_root_id })
          .then((res) => {
            this.replyingParentId = res.data.comment_root_id;
            this.comments = res.data.comments;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onEditComment() { // TODO

    },
    onDeleteComment() { // TODO

    },
    onAddComment(reply, parentId) {
      if(this.project && this.project.id) {
        const { id: projectId } = this.project;

        api.addProjectComment({ projectId, parentId, text: reply })
          .then((res) => {
            const { comment } = res.data;
            this.comments.push(comment);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onChangeSortOption(newOption) {
      this.sortBy = newOption;
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style lang="scss">
.comments {
  font-family: $font-normal;
  color: $main-black;

  .title {
    font-weight: 500;
    line-height: 43px;
    font-size: 32px;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;

    .sort-options {
      color: $grey;
      font-size: 16px;
      font-weight: normal;

      .option {
        padding: 0 10px;
        border-right: 1px solid $grey-light;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
          border-right: none;
        }

        &.selected {
          color: $main-black;
        }
      }
    }
  }

  .tip {
    border: 1px solid $grey-light;
    line-height: 24px;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    margin-bottom: 30px;
    color: $grey;

    span {
      color: $main-black;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .count {
    line-height: 21px;
    font-size: 18px;
    padding-left: 8px;
  }

  > .comment {
    margin-top: 22px;
  }
}
</style>
