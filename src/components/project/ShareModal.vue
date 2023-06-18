<template>
<Modal
  class="share-modal"
  :cancelable="true"
  :title="$t('project.share.title')"
  :submitable="false"
  :expanded="false"
  @cancel="$emit('close')"
>
  <template v-slot:content>
    <div class="share-icons">
      <a class="facebook" target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${link}`">
        <img :src="require('@/static/img/icons/share_facebook.png')">
      </a>
      <a class="twitter" target="_blank" :href="`https://twitter.com/home?status=${link}`">
        <img :src="require('@/static/img/icons/ic_twitter.png')">
      </a>
      <a class="linkedin" target="_blank" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${link}`">
        <img :src="require('@/static/img/icons/share_linkedin.png')">
      </a>
      <a class="mail" :href="`mailto:?&subject=Check%20out%20this%20project&body=${link}`">
        <img :src="require('@/static/img/icons/share_mail.png')">
      </a>
    </div>
    <h4>{{ $t('project.share.link') }}</h4>
    <div class="share-copy">
      <div class="share-copy-text-wrap">
        <div class="share-copy-text">
          {{ link }}
        </div>
      </div>
      <CopyButton :text="$t('copy_link')" :copyText="link" />
    </div>
  </template>
</Modal>
</template>

<script>
import CopyButton from '@/components/widget/CopyButton.vue';
import Modal from '@/components/widget/Modal.vue';

export default {
  name: 'share-modal',
  components: {
    CopyButton,
    Modal,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    link() {
      return `${window.location.origin}/project/${this.project.id}`;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.share-modal {
  .modal-header {
    text-align: center;
  }
  .share-icons {
    text-align: center;
    margin-top: 32px;
    a {
      outline: 0;
      &:not(:last-child) {
        margin-right: 32px;
      }
      &.facebook img {
        width: 10px;
        height: 20px;
      }
      &.twitter img {
        width: 24px;
        height: 18px;
      }
      &.linkedin img {
        width: 20px;
        height: 21px;
      }
      &.mail img {
        width: 24px;
        height: 18px;
      }
    }
  }
  h4 {
    margin-top: 40px;
  }
  .share-copy {
    display: flex;
    width: 100%;
    margin-top: 8px;
    .share-copy-text-wrap {
      padding: 0 16px;
      flex-grow: 1;
      box-sizing: border-box;
      border: 1px solid $border-light;
      border-right: none;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .share-copy-text {
      @include p_small;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .copy-button {
      width: 120px;
      padding-right: 2px;
      flex-shrink: 0;
    }
  }
  @media (max-width: $mobile-width) {
    .share-copy {
      flex-wrap: wrap;
      .share-copy-text-wrap {
        border: 1px solid $border-light;
        height: 48px;
      }
      .copy-button {
        width: 100%;
      }
    }
  }
}
</style>
