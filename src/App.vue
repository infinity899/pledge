<template>
<div id="app">
  <Header
    v-if="!isDashboardPage"
    :dashboard="isDashboard"
    @showBuilder="$router.replace({ path: '/create' })"
  />
  <router-view />
  <Footer
    v-if="!isDashboardPage"
  />
  <BuilderIntro
    v-if="showBuilder"
    :creator="true"
    @hideModal="hideBuilder"
  />
</div>
</template>

<script>
import Header from '@/components/nav/Header.vue';
import Footer from '@/components/nav/Footer.vue';
import BuilderIntro from '@/components/builder/BuilderIntro.vue';
import { GET_CATEGORIES_REQUEST, USER_REQUEST } from '@/store/actions';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    BuilderIntro,
  },
  data() {
    return {
      showBuilder: false,
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    isDashboard() {
      return this.$route.name === 'dashboard';
    },
    isDashboardPage() {
      if(this.$route.name) {
        return this.$route.name.startsWith('dashboard-');
      }
      return false;
    },
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  watch: {
    $route(to, _) {
      const { path } = to;
      this.showBuilder = path.startsWith('/create');
    },
    authenticated(flag) {
      const { meta } = this.$route;
      if(meta && meta.requiresAuth && !flag) {
        this.$router.push({
          name: 'login',
          query: { from: this.$route.fullPath },
        });
      }
    },
  },
  methods: {
    hideBuilder() {
      this.$router.replace({ path: '/' });
      this.showBuilder = false;
    },
  },
  mounted() {
    const { path } = this.$route;
    this.showBuilder = path.startsWith('/create');
  },
  created() {
    this.$store.dispatch(GET_CATEGORIES_REQUEST);
    if(this.$store.getters.isAuthenticated) {
      // Ensure user is authorized
      this.$store.dispatch(USER_REQUEST);
    }
  },
  updated() {
    const { meta } = this.$route;
    if(meta && meta.requiresAuth && !this.authenticated) {
      this.$router.push({
        name: 'login',
        query: { from: this.$route.fullPath },
      });
    }
  },
};
</script>

<style lang="scss">
@import 'general.scss';

html,body {
  padding: 0;
  margin: 0;
  width: 100%;
  background: $white;

  color: $main-black;
  * {
    box-sizing: border-box;
  }
}
html {
  font-family: $font-normal;
}
a {
  text-decoration: none;
  color: $main-black;
}
a:hover {
  color: $main-blue;
}
ul, li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(0deg, $white 0%, $blue-light 100%);
}
#nav {
  padding: 30px;
  a {
    font-weight: 700;
    color: $main-black;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.noscroll {
  overflow: hidden;
}
.mobile-only {
  display: none;
}
button::-moz-focus-inner {
  border: 0;
}
@media only screen and (max-width: 568px) {
  .mobile-only {
    display: unset;
  }
  .no-mobile {
    display: none;
  }
}
</style>
