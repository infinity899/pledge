import moment from 'moment';
import * as api from '@/utils/api';
import { keepAliveInMinutes } from '@/utils/config';
import { AUTH_LOGOUT, USER_REQUEST, USER_FAILURE, USER_SUCCESS, USER_UPDATE, TOGGLE_SAVE_ADDRESS } from '../actions';

const state = {
  status: '',
  profile: {},
  dataAge: null,
  saveAddressForLater: true,
};

const getters = {
  profileStatus: userState => userState.status,
  getProfile: userState => userState.profile,
  isProfileLoaded: userState => !!userState.profile.email,
  getSaveAddressStatus: userState => userState.saveAddressForLater,
};

const actions = {
  [USER_REQUEST]: async ({ commit, dispatch }, forceUpdate = false) => {
    const isExpired = state.dataAge ? moment().diff(state.dataAge, 'minutes') > keepAliveInMinutes : true;
    const shouldCallAPI = forceUpdate || isExpired;

    if(shouldCallAPI) {
      try {
        commit(USER_REQUEST);
        const response = await api.getProfile();
        commit('USER_SUCCESS', response.data.user);
      } catch(error) {
        commit(USER_FAILURE, error);
        if(!error.response.data.token) {
          dispatch(AUTH_LOGOUT);
        }
      }
    }
  },
  [USER_UPDATE]: async ({ commit, dispatch }, payload) => {
    try {
      commit(USER_REQUEST);
      const response = await api.updateProfile(payload);
      commit('USER_SUCCESS', response.data.user);
    } catch(error) {
      commit(USER_FAILURE, error);
      if(!error.response.data.token) {
        dispatch(AUTH_LOGOUT);
      }
    }
  },
  [TOGGLE_SAVE_ADDRESS]: ({ commit }) => {
    commit(TOGGLE_SAVE_ADDRESS);
  },
};

const mutations = {
  [USER_REQUEST]: (userState) => {
    userState.status = 'loading';
  },
  [USER_SUCCESS]: (userState, profile) => {
    userState.status = 'success';
    userState.profile = profile;
    userState.dataAge = moment();
  },
  [USER_FAILURE]: (userState) => {
    userState.status = 'error';
  },
  [AUTH_LOGOUT]: (userState) => {
    userState.profile = {};
  },
  [TOGGLE_SAVE_ADDRESS]: (userState) => {
    userState.saveAddressForLater = !userState.saveAddressForLater;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
