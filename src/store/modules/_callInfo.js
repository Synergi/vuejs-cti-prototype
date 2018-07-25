
const defaultState = {
  callInfo: {},
};

const mutations = {
  callUpdated: (state, data) => {
    state.callInfo = data;
  },
};

const actions = {
  callInfo: state => state.callInfo,
};

export default {
  state: defaultState,
  actions,
  mutations,
};
