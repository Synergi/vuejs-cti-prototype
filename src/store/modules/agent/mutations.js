// agent/mutations

const AGENT_ID = (state, id) => {
  state.agentId = id;
};

const CONNECTION_MODE = (state, mode) => {
  state.connectionMode = mode;
};

const REMOTE_PHONE = (state, ph) => {
  state.remotePhone = ph;
};

const PERSIST = (state, bool) => {
  state.persistentConnection = bool;
};

const CONNECT = state => {
  state.voice = 'connected';
};

const DISCONNECT = state => {
  state.voice = 'disconnected';
};

const PAUSEREASON_PUSH = (state, reason) => {
  state.pauseReasons.push(reason);
};

const PAUSEREASON_SPLICE = (state, index) => {
  state.pausereasons.splice(index, 1);
};

export default {
  AGENT_ID,
  CONNECTION_MODE,
  REMOTE_PHONE,
  PERSIST,
  CONNECT,
  DISCONNECT,
  PAUSEREASON_PUSH,
  PAUSEREASON_SPLICE,
};
