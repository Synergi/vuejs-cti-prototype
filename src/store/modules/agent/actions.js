// auth/actions
import router from "@/router";

const connect = ({ commit }, param) => {
  return new Promise(resolve => {
    setTimeout(() => {
      commit("CONNECT");
      router.push({ path: "toolbar" });
      resolve("connect");
    }, 1000);
  });
};

const disconnect = ({ commit }) => {
  commit("DISCONNECT");
};

export default {
  connect,
  disconnect
};
