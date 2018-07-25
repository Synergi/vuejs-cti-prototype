// fsm/actions
const event = ({ commit, state }, parm) => {
  return new Promise((resolve, reject) => {
    try {
      commit("TRANSITION", parm.transition);
      resolve(state);
    } catch (error) {
      reject(error);
    }
  });
};

const getState = ({ state }) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(state.currentState);
    } catch (error) {
      reject(error);
    }
  });
};

const getAppState = ({ state }) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(state.appState);
    } catch (error) {
      reject(error);
    }
  });
};

const onInvalidTransition = ({ state }) => {
  console.error("INVALID TRANSITION: ", state);
  throw new Error(
    `Transition not allowed from that state: ${JSON.stringify(state)}`
  );
};

export default {
  event,
  getState,
  getAppState,
  onInvalidTransition
};
