import * as api from '@/utils/api';
import {
  GET_EXCHANGE_RATE_REQUEST,
  GET_EXCHANGE_RATE_SUCCESS,
  GET_EXCHANGE_RATE_FAILURE,
} from '../actions';

const state = { plg_to_usd: null, status: '' };

const getters = {
  plg_to_usd: tickerState => tickerState.plg_to_usd,
  isRateLoaded: tickerState => !!tickerState.plg_to_usd,
};

const actions = {
  [GET_EXCHANGE_RATE_REQUEST]: ({ commit }) => {
    commit(GET_EXCHANGE_RATE_REQUEST);
    api.getExchangeRate()
      .then((res) => {
        commit(GET_EXCHANGE_RATE_SUCCESS, res.data.data.plg_to_usd);
      })
      .catch((err) => {
        commit(GET_EXCHANGE_RATE_FAILURE, err);
      });
  },
};

const mutations = {
  [GET_EXCHANGE_RATE_REQUEST]: (tickerState) => {
    tickerState.status = 'loading';
  },
  [GET_EXCHANGE_RATE_SUCCESS]: (tickerState, exchangeRate) => {
    tickerState.status = 'success';
    tickerState.plg_to_usd = exchangeRate;
  },
  [GET_EXCHANGE_RATE_FAILURE]: (tickerState) => {
    tickerState.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
