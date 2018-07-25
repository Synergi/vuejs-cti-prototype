// store/modules/fsm

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { key as STORAGE_KEY } from "./transitions";

const state = {
  appState:
    window.localStorage.getItem(`${STORAGE_KEY}.appState`) || "Connection",
  currentState:
    window.localStorage.getItem(`${STORAGE_KEY}.currentState`) || "offPhone",
  previousState:
    window.localStorage.getItem(`${STORAGE_KEY}.previousState`) || "",
  currentStateDt:
    parseInt(
      window.localStorage.getItem(`${STORAGE_KEY}.currentStateDt`),
      10
    ) || "",
  previousStateDt:
    parseInt(
      window.localStorage.getItem(`${STORAGE_KEY}.previousStateDt`),
      10
    ) || ""
};

export const fsm = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
