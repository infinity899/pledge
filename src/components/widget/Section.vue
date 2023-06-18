<template>
<div :class="['section-wrap', { [sectionClassName]: sectionClassName }]">
  <div class="section-left">
    <h4>{{ info.title }}</h4>
    <div class="section-description">
      {{ info.desc }}
    </div>
    <div v-if="info.note" class="section-note" v-html="info.note" />
    <div v-if="info.link" class="section-link">
      {{ info.link }}
    </div>
  </div>
  <div class="section-right">
    <slot />
  </div>
</div>
</template>

<script>

export default {
  name: 'p-section',
  props: {
    info: {
      type: Object,
      default: null,
    },
    sectionClassName: {
      type: String,
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'general.scss';

.section-wrap {
  border-top: 1px solid $border-light;
  padding: 48px 0;
  display: flex;
  flex-direction: row;

  .section-left {
    margin-right: 40px;
    color: $black-med;
    max-width: 600px;

    .section-description {
      margin-top: 4px;
    }

    .section-note {
      margin-top: 16px;
    }

    .section-link {
      @include link;
      color: $main-blue;
      margin-top: 24px;
    }
  }

  .section-right {
    margin-left: auto;
    min-width: 400px;
  }
}

@media (max-width: $tablet-width) {
  .section-wrap {
    .section-left {
      max-width: 296px;
    }

    .section-right {
      width: 100%;
      min-width: 0;
      max-width: 296px;
    }
  }
}

@media (max-width: $mobile-width) {
  .section-wrap {
    margin-left: 0;
    flex-direction: column;

    .section-left {
      max-width: 100%;
      width: 100%;
      margin-right: 0;
    }

    .section-right {
      margin: 24px 0 0 0;
      width: 100%;
      max-width: 100%;
    }
  }
}

</style>
