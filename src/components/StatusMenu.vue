<template>
  <div>
    <div class="toolbar shadow-bottom" v-bind:class="classObject" v-on:click="toggleStatus()">
      <div class="status-wrapper">
        <span class="status">{{currentStatus}}</span>
        <span class="description text-secondary" v-if="pauseReason">{{pauseReason}}</span>
      </div>
      <div class="actions" v-show="changeStatus"><span class="caret">^</span></div>
      <span class="time text-secondary">05:34</span>
    </div>
    <div class="body" v-show="statusMenu">
      <ul class="statusmenu top-menu top-menu-inverted" v-on:click.prevent="updateStatus($event)">
          <li class="status-ready" v-show="currentStatus!=='ready'&&currentStatus!=='Connection'">
            <a data-set="unpause" href="#">Ready</a>
          </li>
          <li class="status-paused" v-for="item in pauseReasons" v-bind:key="item.id">
            <a data-set="pause" :itemprop="item.id" href="#">{{item.title}}</a>
          </li>
          <li class="item-action item-shadow-top"><a href="https://helpcentre.ipscape.com.au/display/public/FOH/Freshwater+User+Guide" target="_blank">
            <img class="item-icon" src=".././assets/menu-icon-help.png" alt="">Help Centre</a>
          </li>
          <li class="item-action"><a href="#" v-on:click="logout()" data-status="logout"><img class="item-icon" src=".././assets/menu-icon-logout.png" alt="">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import store from "../store";

export default {
  name: "StatusMenu",
  data() {
    return {
      statusMenu: false,
      pauseReason: true,
      changeStatus: true
    };
  },
  computed: {
    ...mapState({
      pauseReasons: state => state.agent.pauseReasons,
      currentStatus: state => state.fsm.appState
    }),
    classObject: function() {
      return {
        "status-description": this.pauseReason,
        "status-paused": this.currentStatus === "Paused",
        "status-ready": this.currentStatus === "Ready",
        "status-dialing": this.currentStatus === "Dialling",
        "status-call disabled": this.currentStatus === "On call",
        "status-settings": this.currentStatus === "Settings",
        "status-wrap": this.currentStatus === "On wrap",
        "status-connect": this.currentStatus === "Connection"
      };
    }
  },
  methods: {
    ...mapMutations([
      "auth/LOGOUT",
      "auth/SUCCESS",
      "auth/ERROR",
      "fsm/TRANSITION"
    ]),
    ...mapActions([
      "auth/logout",
      "fsm/event",
      "fsm/getState",
      "fsm/getAgentState"
    ]),
    updateStatus(e) {
      const value = e.target.hasAttribute("data-set")
        ? e.target.getAttribute("data-set")
        : null;
      const prop = e.target.hasAttribute("itemprop")
        ? e.target.getAttribute("itemprop")
        : null;
      if (value) {
        store.dispatch("fsm/event", { transition: value }).then(result => {
          this.toggleStatus();
        });
      }
    },
    toggleStatus() {
      this.statusMenu = !this.statusMenu;
    },
    logout() {
      store.dispatch("auth/logout").then(res => {
        store.dispatch("fsm/event", { transition: res }).then(result => {
          // broadcast changes
          this.$emit("fsm.updated", {
            to: res.currentState,
            from: res.previousState,
            time: res.currentStateDt
          });
          this.msg = res.currentState;
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/stylesheets/variables.scss";

.text-secondary {
  color: #989898;
}

.toolbar {
  height: 42px;
  background-color: #fdfdfd;
  display: block;
  width: 100%;
  position: relative;
  z-index: 100;
  cursor: pointer;
}
.shadow-bottom {
  box-shadow: 0 0 12px 0px rgba(0, 0, 0, 0.15);
}
.status-wrapper {
  float: left;
  margin-left: 42px;
  margin-top: 4px;
}
.status {
  display: block;
  font-size: 18px;
  font-weight: 500;
  margin-top: 5px;
  text-transform: capitalize;
}
.description {
  display: none;
}
.time {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.8;
  float: right;
  padding: 10px 15px;
}
.actions {
  position: relative;
  float: right;
  width: 32px;
  height: 42px;
  border-right: 1px solid #e1e1e1;
}
.caret {
  position: absolute;
  top: 20px;
  left: 10px;
}
.adaptor-header {
  background: url("sf-adaptor-header.png") 0 0 no-repeat;
  height: 26px;
  width: 100%;
  display: block;
}

.toolbar.status-ready {
  background: url("toolbar-icon-ready.png") #fdfdfd 0 0 no-repeat;
}

.toolbar.status-paused {
  background: url("toolbar-icon-paused.png") #fdfdfd 0 0 no-repeat;
}

.toolbar.status-call {
  background: url("toolbar-icon-call.png") #fdfdfd 0 0 no-repeat;
}

.toolbar.status-connect {
  background: url("toolbar-icon-call.png") #fdfdfd 0 0 no-repeat;
}

.toolbar.status-dialing {
  background: url("toolbar-icon-wrap.png") #fdfdfd 0 0 no-repeat;
}

.toolbar.status-settings {
  background: url("toolbar-icon-settings.png") #fdfdfd 0 0 no-repeat;
}

.toolbar.status-wrap {
  background: url("toolbar-icon-wrap.png") #fdfdfd 0 0 no-repeat;
}

.top-menu {
  position: absolute;
  top: 69px;
  left: 0;
  width: 100%;
  z-index: 200;
  margin: 0;
  padding: 0;
  background-color: #fdfdfd;
  box-shadow: 0 4px 4px -3px rgba(0, 0, 0, 0.45);
}
li {
  list-style: none;

  &.status-paused {
    border-left: 5px solid #f43939;
  }
  &.status-ready {
    border-left: 5px solid $btn-primary-bg;
  }
  &:hover {
    background-color: darken(#fdfdfd, 5%);
  }
  &:not(:first-child) {
    border-top: 1px solid darken(#fdfdfd, 5%);
  }
}
li a {
  color: $gray-base;
  font-size: 16px;
  padding: 10px 10px 10px 20px;
  display: block;
  text-align: left;
  text-decoration: none !important;
}
li a:hover,
li a:visited,
li a:active {
  text-decoration: none !important;
}
.item-primary {
  background-color: #68d253;
}
.item-primary a {
  color: #fff !important;
}
.item-primary a:hover {
  background-color: darken($btn-primary-bg, 10%) !important;
}
.item-description {
  padding: 10px 15px;
  font-size: 10px;
  text-transform: uppercase;
  @extend .text-secondary;
  &:hover {
    background-color: transparent !important;
  }
}
.item-action {
  a {
    padding: 10px 15px;
    font-size: 14px;
    @extend .text-secondary;
    &:hover {
      background-color: transparent !important;
    }
  }
  &.item-shadow-top {
    box-shadow: inset 0 8px 8px -8px #363c43, inset 0 -8px 0 -8px #363c43;
  }
}
.item-icon {
  padding-right: 10px;
  vertical-align: baseline;
}
.top-menu-inverted {
  background-color: #525555;
  li {
    a {
      color: darken(white, 10%);
    }
    &:hover {
      background-color: darken(#525555, 5%);
    }
    &:not(:first-child) {
      border-top: 1px solid lighten(#525555, 10%);
    }
  }
  .item-description {
    color: darken(white, 10%);
  }
}
</style>
