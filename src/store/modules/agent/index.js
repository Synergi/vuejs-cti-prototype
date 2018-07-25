// store/modules/agent

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  agentId: 1819,
  connectionMode: 'systemCallsAgent',
  remotePhone: '+61289993149',
  persistentConnection: true,
  voice: 'disconnected',
  pauseReasons: [{ id: 1, title: 'Pause' }],
};

export const agent = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
