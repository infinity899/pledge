<template>
<div class="container">
  <div class="project-discussion">
    <div class="discussion-wrap">
      <Comments
        v-if="project && project.id"
        :title="$t('project.discussion.title')"
        :project="project"
        :commentPermission="commentPermission"
        @goToPledge="goToPledge"
      />
    </div>
    <div class="discussion-info">
      <div class="description">
        <div class="label">
          {{ $t('project.discussion.info.title') | uppercase }}
        </div>
        <div class="text">
          {{ $t('project.discussion.info.text') }}
        </div>
      </div>
      <div class="description">
        <div class="label">
          {{ $t('project.discussion.info.faqTitle') | capitalize }}
        </div>
        <div class="link" @click="faqClicked">
          <span>
            {{ $t('project.discussion.info.faqLink') | uppercase }}
          </span>
          <img :src="require('@/static/img/icons/ic_contact_arrow.svg')">
        </div>
      </div>
      <div class="description">
        <div class="label">
          {{ $t('project.discussion.info.contactTitle') | uppercase }}
        </div>
        <div class="link">
          <span>
            {{ $t('project.discussion.info.contactLink') | uppercase }}
          </span>
          <img :src="require('@/static/img/icons/ic_contact_arrow.svg')">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Comments from '@/components/widget/Comments.vue';
import * as api from '@/utils/api';

export default {
  name: 'project-comments',
  components: {
    Comments,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      commentPermission: false,
    };
  },
  watch: {
    project: {
      immediate: true,
      handler(val, oldVal) {
        if(val && !oldVal) {
          api.getProjectCommentPermission({ projectId: this.project.id })
            .then((res) => {
              this.commentPermission = res.data.has_permission;
            });
        }
      },
    },
  },
  methods: {
    goToPledge() {
      this.$emit('setTab', {
        name: 'Campaign',
        hash: 'rewards',
      });
    },
    faqClicked() {
      this.$emit('setTab', {
        name: 'FAQ',
        hash: 'faq',
      });
    },
  },
};
</script>

<style lang="scss">
.project-discussion {
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;

  .discussion-wrap {
    padding-right: 10%;
    box-sizing: border-box;
    width: 65%;
  }

  .discussion-info {
    font-family: $font-normal;
    line-height: 1.5em;
    color: $grey;
    width: 35%;
    height: 100%;
    background-color: $grey-light;
    box-sizing: border-box;
    padding: 24px 20px 28px 50px;
    font-size: 13px;

    .description {
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .text {
      color: $main-black;
    }
    .label {
      margin-bottom: 8px;
    }
    .link {
      color: $main-black;
      display: inline-flex;
      align-items: center;
      font-weight: 700;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      span {
        margin-right: 8px;
      }
      img {
        width: 24px;
        height: 10px;
      }
    }
  }
}
</style>

