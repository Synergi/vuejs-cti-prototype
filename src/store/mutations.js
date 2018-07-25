import authMutations from "./modules/auth/mutations";
import agentMutations from "./modules/agent/mutations";
import fsmMutations from "./modules/fsm/mutations";
import callMutations from "./modules/call/mutations";

const mutations = [];

const authkeys = Object.keys(authMutations);
authkeys.forEach(value => {
  mutations.push("auth/" + value);
});

const agentkeys = Object.keys(agentMutations);
agentkeys.forEach(value => {
  mutations.push("agent/" + value);
});

const fsmkeys = Object.keys(fsmMutations);
fsmkeys.forEach(value => {
  mutations.push("fsm/" + value);
});

const callkeys = Object.keys(callMutations);
fsmkeys.forEach(value => {
  mutations.push("call/" + value);
});

export default mutations;
