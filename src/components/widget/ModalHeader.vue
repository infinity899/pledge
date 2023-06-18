<template>
<div class="modal-header-wrap">
  <Logo :showLabel="false" />
  <div class="modal-header-content">
    <slot />
  </div>
  <div class="modal-quit" @click="$emit('hideModal')">
    <div class="quit-text">
      {{ quitText }}
    </div>
    <img class="quit-img" :src="require('@/static/img/icons/ic_close.png')">
  </div>
</div>
</template>

<script>
import Logo from '@/components/nav/Logo.vue';

export default {
  name: 'modal-header',
  components: {
    Logo,
  },
  props: {
    quitText: {
      type: String,
      default: 'Quit',
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.modal-header-wrap {
  display: flex;
  justify-content: space-between;

  .modal-quit {
    @include subtitle;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    .quit-text {
      padding-top: 2px;
    }
    .quit-img {
      margin-left: 10px;
      width: 16px;
      height: 16px;
    }
  }
}

@media (max-width: $mobile-width) {
  .modal-header-wrap {
    display: block;
    position: relative;

    .modal-quit {
      position: absolute;
      top: 8px;
      right: 8px;
    }
  }
}
</style>
