// auth/mutations

const LOGIN = state => {
  state.pending = true;
};

const SUCCESS = state => {
  state.isLoggedIn = true;
  state.pending = false;
};

const ERROR = state => {
  state.isLoggedIn = false;
  state.pending = false;
};

const LOGOUT = state => {
  state.isLoggedIn = false;
};

export default {
  LOGIN,
  LOGOUT,
  SUCCESS,
  ERROR
};
