<template>
<div class="content">
  <AuthModal />
</div>
</template>

<script>
import AuthModal from '@/components/auth/AuthModal.vue';

export default {
  name: 'auth_view',
  components: {
    AuthModal,
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.auth-wrap {
  width: 100%;
  margin: 0 auto;
}
</style>
