// call/mutations

const MANUAL_CALL = (state, num) => {
  state.manualCallNumber = num;
};

const BACKSPACE = state => {
  if (state.manualCallNumber.length === 0) {
    return;
  }

  state.manualCallNumber = state.manualCallNumber.substring(
    0,
    state.manualCallNumber.length - 1
  );
};

const RESET_MANUAL_CALL = state => {
  state.manualCallNumber = "";
};

export default {
  MANUAL_CALL,
  BACKSPACE,
  RESET_MANUAL_CALL
};
