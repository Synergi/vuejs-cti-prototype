// auth/actions
import router from "@/router";

const login = ({ commit }, creds) => {
  console.log(...creds);
  commit("LOGIN", creds); // show spinner
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem("token", "JWT");
      commit("SUCCESS");
      router.push({ path: "connect" });
      resolve();
    }, 1000);
  });
};

const logout = ({ commit }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.removeItem("token");
      commit("LOGOUT");
      router.push({ path: "/" });
      resolve("disconnect");
    }, 1000);
  });
};

export default {
  login,
  logout
};
