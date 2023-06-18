import Vue from 'vue';
import VueYoutube from 'vue-youtube';
import VueAnime from 'vue-animejs';
import vSelect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import vDatepicker from 'vuejs-datepicker';
import moment from 'moment';
import i18n from './i18n';
import '@/utils/filters';
import App from './App.vue';
import router from './router';
import store from './store';
import { client } from './utils/api';
import { AUTH_LOGOUT } from './store/actions';

moment.updateLocale('en', {
  relativeTime: {
    m: '1 minute',
    h: '1 hour',
    d: '1 day',
    M: '1 month',
    y: '1 year',
  },
});

Vue.config.productionTip = false;
Vue.use(VueAnime);
Vue.use(VueYoutube);
Vue.component('v-select', vSelect);
Vue.component('v-datepicker', vDatepicker);
Vue.config.development = process.env.NODE_ENV === 'development';

Vue.mixin({
  methods: {
    scrollToId(elementId) {
      const element = document.getElementById(elementId);
      window.scrollTo(0, element.offsetTop);
    },
  },
});

client.interceptors.response.use(res => res, (err) => {
  if(err.response && err.response.status === 401) {
    store.dispatch(AUTH_LOGOUT);
  }
  return Promise.reject(err);
});

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

// If running e2e tests...
if(process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.login()`.
  window.pledgecampApp = app;
}
