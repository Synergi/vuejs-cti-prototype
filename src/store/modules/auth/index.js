// store/modules/auth

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  isLoggedIn: !!localStorage.getItem("token"),
  pending: false
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
