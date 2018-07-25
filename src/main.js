// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store/index";
import BootstrapVue from "bootstrap-vue";
import Rollbar from "vue-rollbar";

Vue.use(BootstrapVue);

Vue.use(Rollbar, {
  accessToken: "dfb73a1c2d3b4c6cb9d8cb8fd2b3727c",
  captureUnhandledRejections: true,
  payload: {
    environment: "Prototype",
    server: {
      host: "prototype.ipscape.com.au"
    }
  },
  itemsPerMinute: 5,
  maxItems: 30
});

Vue.config.productionTip = true;

Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  console.log("ErrorHandler", info);
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.auth.isLoggedIn) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  template: "<App/>",
  components: { App }
});
