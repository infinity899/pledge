<template>
<div id="content" class="authenticated">
  <h2>{{ $t('auth.authenticating') }}</h2>
</div>
</template>

<script>
import { AUTH_SUCCESS } from '@/store/actions';
import {
  socialLogin,
  USER_TOKEN_KEY,
} from '@/utils/api';

export default {
  name: 'authenticated',
  methods: {
    async socialLogin() {
      try {
        // TODO: maybe there's a more elegant way to grab the site name
        const { path } = this.$route;
        const site = path.split('_')[0].slice(1);
        const resp = await socialLogin(site);
        const { token } = resp.data;
        this.handleSocialAuthSuccess(token);
      } catch(err) {
        // TODO: how to handle error?
        console.log('social login error: ', err);
      }
    },
    handleSocialAuthSuccess(token) {
      localStorage.setItem(USER_TOKEN_KEY, token);
      this.$store.commit(AUTH_SUCCESS, token);
      this.$router.push({ name: 'user' });
    },
  },
  mounted() {
    // Automatically login and redirect to user profile
    this.socialLogin();
  },
};
</script>

<style lang="scss">

#content {
  overflow: hidden;
  min-height: 400px;
  box-sizing: border-box;
}
.authenticated {
  margin: 0 auto;
}
</style>
