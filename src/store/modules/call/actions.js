// call/actions

const editManualCallNumber = ({ commit, state }, num) => {
  return new Promise((resolve, reject) => {
    try {
      commit("MANUAL_CALL", (state.manualCallNumber += num));
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  editManualCallNumber
};
