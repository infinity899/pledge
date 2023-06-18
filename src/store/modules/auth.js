import i18n from '@/i18n';
import { userLogin, USER_TOKEN_KEY } from '@/utils/api';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_INCOMPLETE,
  AUTH_LOGOUT,
  USER_REQUEST,
} from '../actions';

const errorCopy = i18n.t('auth.errors');

const state = {
  token: localStorage.getItem(USER_TOKEN_KEY) || '',
  status: '',
  errors: '',
};

const getters = {
  isAuthenticated: authState => authState.token,
  authStatus: authState => authState.status,
  errors: authState => authState.errors,
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    userLogin(user)
      .then((resp) => {
        const { token } = resp.data;
        localStorage.setItem(USER_TOKEN_KEY, token);
        commit(AUTH_SUCCESS, token);
        dispatch(USER_REQUEST); // Load user profile after success login
        resolve(resp);
      })
      .catch((err) => {
        if(err.response && err.response.status === 400) {
          const { token } = err.response.data;
          const { errors } = err.response.data;
          localStorage.setItem(USER_TOKEN_KEY, token);
          commit(AUTH_INCOMPLETE, { token, errors });
          resolve(err.response);
        } else {
          commit(AUTH_FAILURE, err);
          localStorage.removeItem(USER_TOKEN_KEY);
          if(err.response && err.response.status === 401) {
            reject(errorCopy.LOGIN_FAILURE);
          } else {
            reject(errorCopy.NETWORK_FAILURE);
          }
        }
      });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem(USER_TOKEN_KEY);
    resolve();
  }),
};

const mutations = {
  [AUTH_REQUEST]: (authState) => {
    authState.status = 'loading';
  },
  [AUTH_SUCCESS]: (authState, token) => {
    authState.status = 'success';
    authState.token = token;
    authState.errors = '';
  },
  [AUTH_INCOMPLETE]: (authState, { token, errors }) => {
    authState.status = 'incomplete';
    authState.token = token;
    authState.errors = errors;
  },
  [AUTH_FAILURE]: (authState) => {
    authState.status = 'error';
  },
  [AUTH_LOGOUT]: (authState) => {
    authState.status = '';
    authState.token = '';
    authState.errors = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
