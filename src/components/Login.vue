<template>
  <div class="adaptor">
    <div class="adaptor-header"></div>
    <div class="adaptor-body">
      <section class="login wrapper" pointer-events third-parties ngClass="noHover">
        <div class="container">
          <div class="logo text-center"><img src="../assets/login-logo.png" alt="ipSCAPE"></div>

          <b-form @submit.prevent="submitForm()">
            <b-form-group id="userInputGroup"
                    label-for="user">
              <b-form-input id="user" v-model="form.username"
                type="text"
                required
                placeholder="Username"></b-form-input>
          </b-form-group>
          <b-form-group id="passInputGroup"
                    label-for="pass">            
            <b-form-input id="pass" v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder="Password"></b-form-input>
          </b-form-group>
          <b-button :disabled="$v.form.$invalid" type="submit" block variant="success">Login</b-button>
          </b-form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import bForm from "bootstrap-vue/es/components/form/form";
import store from "../store";

export default {
  name: "Login",
  data() {
    return {
      form: {}
    };
  },
  mixins: [validationMixin],
  components: {
    "b-form": bForm
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapMutations(["auth/LOGIN", "auth/SUCCESS", "auth/ERROR"]),
    ...mapActions(["auth/login"]),
    submitForm() {
      const creds = this.form;
      store.dispatch("auth/login", { creds }).then(res => {
        console.log("RES", res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  height: 100%;
  width: 100%;
}
</style>
