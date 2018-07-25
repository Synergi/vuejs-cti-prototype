// fsm/getters

const appState = state => {
  return state.appState;
};
const currentState = state => {
  return state.currentState;
};
const previousState = state => {
  return state.previousState;
};
const currentStateDt = state => {
  return state.currentStateDt;
};
const previousStateDt = state => {
  return state.previousStateDt;
};

export default {
  appState,
  currentState,
  previousState,
  currentStateDt,
  previousStateDt
};
