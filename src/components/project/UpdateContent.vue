<template>
<div class="update-content">
  <div class="header">
    <div class="mobile-close" @click="toggleDetailView">
      <img :src="require('@/static/img/icons/ic_close.png')">
    </div>
    <h1>{{ update.name }}</h1>
    <div class="header-details">
      <img v-if="imageUrl" :src="imageUrl">
      <img v-else :src="require('@/static/img/avatar.png')">
      <span class="header-name">
        {{ author.name }}
      </span>
      <span class="header-date">
        {{ update.date }}
      </span>
    </div>
  </div>
  <div class="content-body">
    <Markdown :content="update.description" />
  </div>
  <!-- <div class="comments">
    <Comments :project="project" v-if="project && project.id" />
  </div> -->
</div>
</template>

<script>
import Markdown from '@/components/widget/Markdown.vue';
// import Comments from '@/components/widget/Comments.vue';
// TODO: adjust comments to handle updates as well, each update has own comments

export default {
  name: 'update-content',
  components: {
    Markdown,
    // Comments,
  },
  props: {
    update: {
      type: Object,
      required: true,
    },
    toggleDetailView: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    author() {
      if(!this.project) {
        return {};
      }
      return this.project.creator;
    },
    imageUrl() {
      const { image } = this.author;
      return image ? image.url : null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "general.scss";

.update-content {
  .mobile-close {
    display: none;
    margin-bottom: 24px;
    text-align: right;
    img {
      width: 24px;
      height: 24px;
    }
  }
  flex-basis: 60%;
  padding-left: 60px;
  .header-details {
    display: flex;
    align-items: center;
    @include subheading;
    margin-top: 20px;

    .header-name {
      margin-right: 18px;
      margin-left: 8px;
    }
    > img {
      width: 24px;
      height: 24px;
      margin-left: 4px;
    }
  }
  .content-body {
    @include p_small;
    font-weight: 300;
    margin-top: 42px;
  }
  @media (max-width: $tablet-width) {
    .header-details {
      flex-wrap: wrap;
    }
  }
  @media (max-width: $mobile-width) {
    flex-basis: 100%;
    padding-left: 0;
    .header {
      .mobile-close {
        display: block;
      }
      h1 {
        @include h3;
      }
    }
  }
}

</style>
