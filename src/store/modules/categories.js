import * as api from '@/utils/api';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from '../actions';

const state = { categories: [], status: '' };

const getters = {
  categories: categoriesState => categoriesState.categories,
  categoriesLoaded: categoriesState => categoriesState.status === 'success',
  categoriesWithAll: categoriesState => ([
    { id: 0, name: 'All Projects' },
    ...categoriesState.categories,
  ]),
};

const actions = {
  [GET_CATEGORIES_REQUEST]: ({ commit }) => {
    commit(GET_CATEGORIES_REQUEST);
    api.getCategories()
      .then((res) => {
        let { categories } = res.data;
        categories = categories.map((c, index) => ({
          ...c,
          image: require(`@/static/img/ic_category-${index+1}.png`), // eslint-disable-line
        }));
        commit(GET_CATEGORIES_SUCCESS, categories);
      })
      .catch((err) => {
        commit(GET_CATEGORIES_FAILURE, err);
      });
  },
};

const mutations = {
  [GET_CATEGORIES_REQUEST]: (categoriesState) => {
    categoriesState.status = 'loading';
  },
  [GET_CATEGORIES_SUCCESS]: (categoriesState, categories) => {
    categoriesState.status = 'success';
    categoriesState.categories = categories;
  },
  [GET_CATEGORIES_FAILURE]: (categoriesState) => {
    categoriesState.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
