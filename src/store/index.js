import Vue from "vue";
import Vuex from "vuex";
import localStoragePlugin from "./plugins/localStoragePlugin";
import createPersistedState from "vuex-persistedstate";
import createMutationsSharer from "vuex-shared-mutations";

import mutations from "./mutations";
import { auth } from "./modules/auth/index";
import { agent } from "./modules/agent/index";
import { fsm } from "./modules/fsm/index";
import { call } from "./modules/call/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    agent,
    fsm,
    call
  },
  plugins: [
    localStoragePlugin(),
    createPersistedState({ storage: window.sessionStorage }),
    createMutationsSharer({
      predicate: (mutation, state) => {
        const predicate = mutations;
        // console.log(predicate);
        return predicate.indexOf(mutation.type) >= 0;
      }
    })
  ]
});
