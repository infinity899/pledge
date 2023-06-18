<template>
<router-link :to="{ name: link }">
  <div :class="{ 'dashboard-link': true, secondary }">
    <img v-if="icon" :src="require(`@/static/img/art_icons/${icon}`)">
    <div class="text">
      <h3>{{ copy.title }}</h3>
      <div class="desc">
        {{ copy.desc }}
      </div>
    </div>
    <div class="right">
      <slot />
      <Arrow :color="'#2e40ea'" />
    </div>
  </div>
</router-link>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'dashboard-link',
  components: { Arrow },
  props: {
    copy: {
      type: Object,
      default: () => {},
    },
    icon: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    secondary: Boolean,
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.dashboard-link {
  width: 100%;
  background-color: $white;
  border: 1px solid $border-lighter;
  display: flex;
  align-items: center;
  padding: 24px;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 53px;
    height: 53px;
    margin-right: 24px;
  }
  .text {
    .desc {
      @include p_small;
    }
  }
  .right {
    margin-left: auto;
    @include h4;
    svg {
      position: relative;
      margin-left: 12px;
      top: -2px;
    }
  }

  &.secondary {
    border: none;
    background-color: $section-highlight;
  }
}
</style>
