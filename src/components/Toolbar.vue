<template>
<div class="adaptor">
    <div class="adaptor-header"></div>
    <div class="adaptor-body">
      <section class="dialer wrapper" pointer-events third-parties  ngClass="noHover">
        <StatusMenu />
        <CampaignSelector/>
        <div class="dialpad-wrapper">
          <div class="display">
            <form name="manualCallForm" @submit.prevent="(manualCallForm.$valid)? selectCampaign():reset()" novalidate>
              <input required type="tel" id="phonenumber" v-model="inputValue" />
              <span class="btn-remove" v-on:click="backspace()"><img src="../assets/dialpad-icon-erase.png" alt=""></span>
            </form>
          </div>
          <div class="container">
            <div id="dialpad" class="dialpad" v-on:click="dialpadEvent($event)">
              <div class="dial-row">
                <div class="dial-cell" data-value="1">
                  <span class="dial-number">1</span>
                </div>
                <div class="dial-cell" data-value="2">
                  <span class="dial-number">2</span>
                  <span class="dial-text">abc</span>
                </div>
                <div class="dial-cell" data-value="3">
                  <span class="dial-number">3</span>
                  <span class="dial-text">def</span>
                </div>
              </div>
              <div class="dial-row">
                <div class="dial-cell" data-value="4">
                  <span class="dial-number">4</span>
                  <span class="dial-text">ghi</span>
                </div>
                <div class="dial-cell" data-value="5">
                  <span class="dial-number">5</span>
                  <span class="dial-text">jkl</span>
                </div>
                <div class="dial-cell" data-value="6">
                  <span class="dial-number">6</span>
                  <span class="dial-text">mon</span>
                </div>
              </div>
              <div class="dial-row">
                <div class="dial-cell" data-value="7">
                  <span class="dial-number">7</span>
                  <span class="dial-text">pqrs</span>
                </div>
                <div class="dial-cell" data-value="8">
                  <span class="dial-number">8</span>
                  <span class="dial-text">tuv</span>
                </div>
                <div class="dial-cell" data-value="9">
                  <span class="dial-number">9</span>
                  <span class="dial-text">wxyz</span>
                </div>
              </div>
              <div class="dial-row">
                <div class="dial-cell v-align-middle" data-value="+">
                  <span class="dial-symbol">+</span>
                </div>
                <div class="dial-cell" data-value="0">
                  <span class="dial-number">0</span>
                </div>
                <div class="dial-cell v-align-middle" data-value="#">
                  <span class="dial-symbol">#</span>
                </div>
              </div>
            </div>
            <div v-if="!campaignSelectionIsAllowed()" class="form-group">
              <button id="manual-call-button" class="btn btn-primary btn-block" type="button" v-on:click="callWithCampaignId()">
                Call
              </button>
            </div>
            <div v-if="campaignSelectionIsAllowed()">
              <button id="manual-call-button" type="button" class="btn btn-primary btn-block" :disabled="$v.inputValue.$invalid" v-on:click="selectCampaign()">Call</button>
            </div>
          </div>
        </div>
      </section>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import StatusMenu from '@/components/StatusMenu';
import CampaignSelector from '@/components/CampaignSelector';
import store from '../store';

export default {
  name: "Toolbar",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      manualCallForm:{},
    };
  },
  mixins: [validationMixin],
  components: {
    StatusMenu,
    CampaignSelector,
  },
  validations: {
    inputValue: {
      required
    },
  },
  computed : {
    ...mapState({
      manualCallNumber: 'call/manualCallNumber',
    }),
    inputValue: {
      get() {
        return this.$store.state.call.manualCallNumber;
      },
      set(value) {
        this.$store.commit('call/MANUAL_CALL', value);
      },
    },
    
  },
  methods: {
    ...mapMutations(['call/BACKSPACE']),
    campaignSelectionIsAllowed() {
      return true;
    },
    selectCampaign() {
      store.dispatch('fsm/event', { transition: 'manualPreview' }).then((result) => {
          console.log('status:', result);
        });
    },
    backspace() {
       this.$store.commit('call/BACKSPACE');
    },
    manualCallPhoneNumberEdited() {
      //
    },
    reset() {
      //
    },
    callWithCampaignId() {

    },
    dialpadEvent: (e) => {
      if (e.target.hasAttribute('data-value')) {
        const value = e.target.getAttribute('data-value');
        console.warn('DIALPAD', value);
        if (value) {
          store.dispatch('call/editManualCallNumber', value);
        }
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/stylesheets/variables.scss';
@import '../assets/stylesheets/mixins.scss';

.dialer {
  height: 100%;
  width: 100%;
}

.dialpad-wrapper {
  .display {
    display: block;
    position: relative;
    padding: 6px 25px;
    height: 56px;
    background-color: #e8e9ea;
    input {
      border: none;
      border-bottom: 2px solid #dddddd;
      background-color: transparent;
      font-size: 18px;
      color: #606060;
      width: 100%;
      margin-top: 6px;
      outline: none;
      box-shadow: unset;;
      &:focus {
        outline: none;
      }
    }
    .btn-remove {
      cursor: pointer;
      position: absolute;
      right: 25px;
      top: 21px;
      font-size: 11px;
      color: $gray-lighter;
    }
  }

  .dialpad {
    display: table;
    border-collapse: collapse;
    width: 100%;
    margin: 5px 0 10px;
    .dial-row {
      display: table-row;
      border-bottom: 1px solid #efefef;
      .dial-cell {
        display: table-cell;
        text-align: center;
        vertical-align: top;
        border-right: 1px solid #efefef;
        padding: 6px;
        cursor: pointer;
        position: relative;
        @include user-select(none);
        .dial-number {
          display: block;
          font-size: 22px;
          color: #cbcbcb;
        }
        .dial-text {
          display: block;
          font-size: 9px;
          text-transform: uppercase;
        }
        .dial-symbol {
          font-weight: 500;
          font-size: 18px;
        }
        > span:first-child {
          pointer-events: none;
        }
        &:last-child {
          border-right: none;
        }
        &:hover {
          .dial-number {
            color: $gray-base;
          }
          .dial-symbol {
            color: $btn-primary-bg;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
    &.disabled {
      pointer-events: none;
      @include opacity(0.5);
    }
  }
  .triangle-bottom-right {
    margin: 5px;
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: 0 0 12px 12px;
    border-color: transparent transparent $gray-lighter transparent;
    z-index: 10;
    &:hover {
      border-color: transparent transparent $gray-base transparent;
    }
  }
}

@media (max-width: 240px) {
  .dialpad-wrapper {
    .display {
      padding: 6px 10px;
      .btn-remove {
        right: 10px;
      }
    }
  }
}
</style>
