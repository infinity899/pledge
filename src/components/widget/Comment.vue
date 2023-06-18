<template>
<div class="comment">
  <div class="avatar-wrap">
    <Avatar :user="comment.user" />
  </div>
  <div class="content-wrap">
    <div v-if="!isEditing">
      <div class="name">
        <router-link :to="{ name: 'user-public', params: {id: comment.user.id}}">
          <span>{{ comment.user.name }}</span>
        </router-link>
        <span v-if="isCreator" class="is-creator">
          {{ $t('comments.labels.creator') }}
        </span>
      </div>
      <div class="content">
        {{ comment.text }}
      </div>
      <!-- eslint-disable vue-i18n/no-raw-text -->
      <div class="info">
        <svg viewBox="0 0 100 100" @click="vote">
          <g stroke-width="1" fill="#000000" stroke="none">
            <polygon points="50,20 0,60 100,60" :class="`info-vote ${comment.user_voted && 'voted'}`" />
          </g>
        </svg>
        <span>{{ $tc('comments.points', comment.points) }}</span>
        <span>&bull;</span><span>{{ fromNow | uppercase }}</span><span>&bull;</span>
        <span class="info-link">
          {{ $t('comments.flag') }}
        </span>
        <span>&bull;</span>
        <span class="info-link" @click="onReply">
          {{ $t('comments.buttons.reply') | uppercase }}
        </span>
        <span>&bull;</span>
        <span class="info-link" @click="onEditComment">
          {{ $t('comments.edit') }}
        </span>
        <span>&bull;</span>
        <span class="info-link" @click="onDeleteComment">
          {{ $t('comments.delete') }}
        </span>
      </div>
      <!-- eslint-enable vue-i18n/no-raw-text -->
    </div>
    <ReplyBox
      v-else
      :initialText="comment.text"
      :parentId="comment.id"
      :onSubmit="onSubmitEdit"
      :onCancel="onCancelEdit"
    />
    <div class="actions">
      <span
        v-if="comment.children.length > 0"
        class="toggle-replies"
        @click="toggleShowReplies"
      >
        {{ (showReplies ? $t('comments.buttons.hideReplies') : $t('comments.buttons.viewReplies')) | uppercase }}
      </span>
    </div>
    <ReplyBox
      v-if="isReplying"
      :parentId="comment.id"
      :onSubmit="onSubmitReply"
      :onCancel="onCancelReply"
      :commentPlaceholder="$t('comments.writeReply')"
      :cancelable="true"
    />
    <div v-if="showReplies && comment.children" class="replies-wrap">
      <div
        v-for="(reply, index) in comment.children"
        :key="index"
        class="replies"
        :class="{'creator-reply': (reply.user.id === creator.id) }"
      >
        <!-- eslint-disable vue-i18n/no-raw-text -->
        <div class="separator">
          &nbsp;
        </div>
        <!-- eslint-enable vue-i18n/no-raw-text -->
        <comment
          :project="project"
          :creator="creator"
          :initialComment="reply"
          :commentPermission="commentPermission"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';

import Avatar from '@/components/widget/Avatar.vue';
import ReplyBox from '@/components/widget/ReplyBox.vue';
import * as api from '@/utils/api';

export default {
  name: 'comment',
  components: {
    Avatar,
    ReplyBox,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    creator: {
      type: Object,
      default: null,
    },
    initialComment: {
      type: Object,
      default: null,
    },
    commentPermission: Boolean,
  },
  data() {
    return {
      showReplies: true,
      isReplying: false,
      isEditing: false,
      replies: null,
    };
  },
  computed: {
    fromNow() {
      return moment(this.comment.created || Date.now()).fromNow();
    },
    isCreator() {
      return (this.creator && this.comment.user) && (this.creator.id === this.comment.user.id);
    },
  },
  methods: {
    toggleShowReplies() {
      this.showReplies = !this.showReplies;
    },
    onReply() {
      this.replyMessage = '';
      this.isReplying = true;
    },
    onSubmitReply(reply, parentId) {
      if(this.project) {
        api.addProjectComment({ projectId: this.project.id, parentId, text: reply })
          .then((res) => {
            const { comment } = res.data;
            this.comment.children.push(comment);
            this.isReplying = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onCancelReply() {
      this.isReplying = false;
    },
    onEditComment() {
      this.isEditing = true;
    },
    onSubmitEdit(text, parentId) {
      api.editComment({ commentId: parentId, text })
        .then(() => {
          this.comment.text = text;
          this.isEditing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCancelEdit() {
      this.isEditing = false;
    },
    onDeleteComment() {
      const { comment } = this;
      api.deleteComment({ commentId: comment.id })
        .then(() => {
          comment.text = this.$t('comments.labels.deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    vote() {
      if(this.commentPermission) {
        const { project, comment } = this;
        const originalVote = comment.user_voted;
        const originalPoints = comment.user_voted;
        comment.user_voted = !originalVote;
        comment.points += originalVote ? -1 : 1;
        api.voteComment({
          projectId: project.id,
          commentId: comment.id,
          vote: !originalVote,
        })
          .catch(() => {
            comment.user_voted = originalVote;
            comment.points = originalPoints;
          });
      } else {
        // TODO -- show login modal
      }
    },
    getReplies() {
      const { project, comment } = this;
      if(project) {
        api.getCommentReplies({
          commentId: comment.id,
        })
          .then((res) => {
            this.comment.children += res.data.comments;
          });
      }
    },
  },
  created() {
    this.comment = this.initialComment;
  },
};
</script>

<style lang="scss" scoped>
@import 'general.scss';

.comment {
  display: flex;
  font-family: $font-normal;
  line-height: 24px;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  color: $main-black;

  .avatar-wrap {
    margin-right: 20px;

    .avatar {
      .avatar-img {
        width: 40px;
        height: 40px;
      }
    }
  }

  .content-wrap {
    width: 100%;

    .name {
      @include h5;
      margin: 3px 0 6px;

      .is-creator {
        display: inline-block;
        padding: 4px 10px;
        background: $main-blue;
        color: white;
        line-height: 13px;
        margin-left: 10px;
        border-radius: 10px;
        font-size: 11px;
        letter-spacing: 0.5px;
      }
    }

    .info {
      @include p_info;
      color: $grey;
      margin-top: 5px;
      display: flex;
      align-items: center;
      letter-spacing: 0.2px;
      > *:not(:last-child) {
        margin-right: 4px;
      }
      > svg {
        width: 11px;
        height: 11px;
        cursor: pointer;
        &:hover .info-vote, .info-vote.voted {
          fill: $main-blue;
        }
      }
      .info-link {
        cursor: pointer;
        &:hover {
          color: $main-black;
        }
      }
    }

    .content {
      word-break: break-word;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .actions {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
    }

    .toggle-replies {
      color: $main-black;
      font-weight: 600;
      font-size: 12px;
    }
  }

  .replies-wrap {
    margin-top: 20px;
    .replies {
      display: flex;

      .separator {
        margin-right: 20px;
        width: 2px;
        background: $blue-med;
      }

      &.creator-reply {
        .separator {
          background: $main-blue;
        }
      }
    }

    :first-child {
      .comment {
        margin-top: 0;
      }
    }

    :last-child {
      .comment {
        margin-bottom: 0;
      }
    }
  }
}
</style>
