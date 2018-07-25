<template>
  <div id="app">
    <div class="body">
      <div class="header"></div>
      <div class="container">
        <div v-if="type === 'A'">
          <router-view></router-view>
        </div>
        <Sforce/>
      </div>
      <div class="footer">
        <img class="pull-right" v-on:click="toggleAdaptor()" src="./assets/sf-btn-phone.png">
      </div>
    </div>
  </div>
</template>

<script>
import Sforce from "./components/Sforce";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/stylesheets/variables.scss";

export default {
  name: "App",
  data() {
    return {
      type: "A"
    };
  },
  components: {
    Sforce
  },
  methods: {
    toggleAdaptor() {
      console.log(this.type);
      this.type = this.type === "A" ? "B" : "A";
      return;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.body {
  padding: 0;
  margin: 0;
  background-image: url("./sf-bg.png");
  background-repeat: no-repeat;
  background-position: 0px 0px;
}
.pull-right {
  float: right;
}
.form-group {
  margin-bottom: 0.25rem;
}
.header,
.marketing {
  padding-left: 15px;
  padding-right: 15px;
}
header {
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}
.footer {
  width: 100%;
  background-color: #252c33;
  position: fixed;
  bottom: 0;
  margin: 0;
  padding: 0;
}
.adaptor {
  position: fixed;
  right: 65px;
  bottom: 45px;
  width: 250px;
  height: 426px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 0 rgba(0, 0, 0, 0.15);
}
.adaptor-header {
  background: url("sf-adaptor-header.png") 0 0 no-repeat;
  height: 26px;
  width: 100%;
  display: block;
}
.adaptor-body {
  overflow: scroll;
  height: inherit;
}
</style>
