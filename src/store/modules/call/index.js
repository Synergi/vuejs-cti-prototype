// store/modules/call

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
const STORAGE_KEY = "cti.call";

const state = {
  manualCallNumber:
    window.localStorage.getItem(`${STORAGE_KEY}.manualCallPhoneNumber`) || ""
};

export const call = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
