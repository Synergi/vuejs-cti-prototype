// store/modules/campaigns

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  campaigns: [],
  selected: {}
};

export const campaigns = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
