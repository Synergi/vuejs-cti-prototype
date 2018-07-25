// agent/getters

const hasVoiceConnection = state => {
  return state.voice === "connected" ? true : false;
};

export default {
  hasVoiceConnection
};
