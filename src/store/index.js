import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import categories from './modules/categories';
import searchResults from './modules/searchResults';
import ticker from './modules/ticker';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    categories,
    searchResults,
    ticker,
    user,
  },
  strict: debug,
});
