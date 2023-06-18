import * as api from '@/utils/api';
import {
  GET_SEARCH_RESULTS_FAILURE,
  GET_SEARCH_RESULTS_REQUEST,
  GET_SEARCH_RESULTS_SUCCESS,
} from '../actions';

const state = { projects: [], projectPagination: {}, status: '' };

const getters = {
  projectsSearchResult: searchResultsState => searchResultsState.projects,
  projectsSearchResultPagination: searchResultsState => searchResultsState.projectPagination,
};

const actions = {
  [GET_SEARCH_RESULTS_REQUEST]: ({ commit }, query) => {
    commit(GET_SEARCH_RESULTS_REQUEST);
    api.search({ query })
      .then((res) => {
        commit(GET_SEARCH_RESULTS_SUCCESS, res);
      })
      .catch((err) => {
        commit(GET_SEARCH_RESULTS_FAILURE, err);
      });
  },
};

const mutations = {
  [GET_SEARCH_RESULTS_REQUEST]: (searchResultsState) => {
    searchResultsState.status = 'loading';
  },
  [GET_SEARCH_RESULTS_SUCCESS]: (searchResultsState, result) => {
    searchResultsState.status = 'success';
    searchResultsState.projects = result.projects;
    searchResultsState.projectPagination = result.pagination;
  },
  [GET_SEARCH_RESULTS_FAILURE]: (searchResultsState) => {
    searchResultsState.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
