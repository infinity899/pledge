<template>
<transition name="modal">
  <div :class="!isRoute ? 'modal-login-outer' : 'auth-wrap'">
    <div class="modal-login-inner" :class="isRoute ? 'auth-inner' : ''">
      <div v-if="!isRoute" class="modal-login-header">
        <Logo />
        <div v-if="showClose" class="login-modal-close" @click="handleClose">
          <div>{{ $t('close') }}</div>
          <img class="close-img" :src="require('@/static/img/icons/ic_close.png')">
        </div>
      </div>
      <div class="modal-login-main">
        <slot name="content" />
        <div class="images">
          <div class="images-left">
            <img class="image-item gin" :src="require('@/static/img/login_left2.jpg')">
            <img class="image-item socks" :src="require('@/static/img/login_left1.jpg')">
            <img class="image-item singer" :src="require('@/static/img/login_left3.jpg')">
          </div>
          <div class="images-right">
            <img class="image-item bottles" :src="require('@/static/img/login_right1.jpg')">
            <img class="image-item phone" :src="require('@/static/img/login_right2.jpg')">
            <img class="image-item gadget" :src="require('@/static/img/login_right3.jpg')">
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Logo from '@/components/nav/Logo.vue';

export default {
  name: 'auth-layout',
  components: {
    Logo,
  },
  props: {
    isRoute: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClose() {
      this.$emit('closeModal');
    },
  },
};

</script>

