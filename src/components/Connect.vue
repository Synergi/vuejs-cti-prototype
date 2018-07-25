<template>
  <div class="adaptor">
    <div class="adaptor-header"></div>
    <div class="adaptor-body">
      <section class="connect wrapper" pointer-events third-parties ngClass="noHover">
        <StatusMenu />
        <div class="container">
          <b-form @submit.prevent="connectVoice()">
            <b-form-group id="connectionInputGroup"
              label="Connection Mode"
              label-for="connectionMode">
              <b-form-select id="connectionMode" v-model="connectionMode" :options="options" class="mb-3" />
            </b-form-group>
           <div v-if="agent.connectionMode === 'agentCallsSystem'">
            <b-form-group id="agentIdInputGroup"
              label="Agent ID"
              label-for="agentId">            
              <b-form-input id="agentId" v-model="agent.agentId"
                type="text"
                disabled></b-form-input>
            </b-form-group>
           </div>
           <div v-if="agent.connectionMode === 'systemCallsAgent'">
            <b-form-group id="scaPhoneNumberInputGroup"
              label-for="scaPhoneNumber">            
              <b-form-input id="scaPhoneNumber" v-model="remotePhone"
                type="text"
                aria-placeholder="Phone number"></b-form-input>
            </b-form-group>
            <b-form-checkbox id="persistentConnection"
              v-model="persistentConnection">
              Connection persistence
            </b-form-checkbox>
           </div>
            <b-button :disabled="$v.agent.$invalid" type="submit" block variant="success">Start</b-button>
          </b-form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import StatusMenu from "@/components/StatusMenu";
import bForm from "bootstrap-vue/es/components/form/form";
import store from "../store";

export default {
  name: "Connect",
  data() {
    return {
      options: [
        { value: "systemCallsAgent", text: "System calls Agent" },
        { value: "agentCallsSystem", text: "Agent calls System" }
      ]
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: "auth/isLoggedIn",
      agent: "agent"
    }),
    connectionMode: {
      get() {
        return this.$store.state.agent.connectionMode;
      },
      set(value) {
        this.$store.commit("agent/CONNECTION_MODE", value);
      }
    },
    remotePhone: {
      get() {
        return this.$store.state.agent.remotePhone;
      },
      set(value) {
        this.$store.commit("agent/REMOTE_PHONE", value);
      }
    },
    persistentConnection: {
      get() {
        return this.$store.state.agent.persistentConnection;
      },
      set(value) {
        this.$store.commit("agent/PERSIST", value);
      }
    }
  },
  mixins: [validationMixin],
  components: {
    "b-form": bForm,
    StatusMenu
  },
  validations: {
    agent: {}
  },
  methods: {
    ...mapMutations([
      "agent/CONNECTION_MODE",
      "agent/PHONE",
      "agent/PERSIST",
      "fsm/TRANSITION"
    ]),
    ...mapActions(["event", "getState"]),
    connectVoice() {
      store.dispatch("agent/connect").then(res => {
        console.log("CONNECT", res);
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
.connect {
  height: 100%;
  width: 100%;

  .container {
    margin-top: 20px;

    label {
      font-size: 0.9em;
      font-weight: bold;
    }
  }
}
</style>
