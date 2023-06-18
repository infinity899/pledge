<template>
<div class="reply-box">
  <img class="avatar" :src="require('@/static/img/avatar.png')">
  <div class="reply-input-wrapper">
    <AutoFitInput
      v-model="reply"
      class="reply-input"
      :placeholder="commentPlaceholder"
      @focus="showButtons = true"
      @blur="showButtons = false"
    />
    <div :class="`reply-actions ${(reply.length > 0 || showButtons) ? 'show' : 'hide'}`">
      <button class="btn btn-post" @click="submitClick">
        {{ $t('comments.buttons.post') }}
      </button>
      <button class="btn btn-cancel" @click="cancelClick">
        {{ $t('comments.buttons.cancel') }}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import AutoFitInput from '@/components/widget/AutoFitInput.vue';

export default {
  name: 'reply-box',
  components: {
    AutoFitInput,
  },
  props: {
    initialText: {
      type: String,
      default: null,
    },
    commentPlaceholder: {
      type: String,
      default: null,
    },
    parentId: {
      type: Number,
      default: 0,
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      reply: '',
      showButtons: false,
    };
  },
  methods: {
    submitClick() {
      this.onSubmit(this.reply, this.parentId);
      this.reply = '';
    },
    cancelClick() {
      this.onCancel();
      this.reply = '';
    },
  },
  created() {
    if(this.initialText) {
      this.reply = this.initialText;
    }
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.reply-box {
  display: flex;
  padding: 16px;
  border: 1px solid $border-light;

  .avatar {
    width: 45px;
    height: 45px;
  }
  .reply-input-wrapper {
    margin-left: 30px;
    width: 100%;
  }

  .reply-actions {
    height: 0;
    overflow: hidden;
    transition: height 0.25s ease-out;
    box-sizing: border-box;
    &.show {
      height: 72px;
    }
    .btn-post {
      @include button($main-blue, large);
      width: 140px;
      margin-right: 10px;
      margin-top: 24px;
    }
    .btn-cancel {
      @include button($main-black, large, secondary);
      width: 140px;
      background-color: $white;
      color: $main-black;
      margin-top: 24px;
    }
  }
}
</style>
