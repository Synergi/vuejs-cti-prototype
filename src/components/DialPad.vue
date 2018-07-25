<template>
  <div class="dialpad-wrapper">
    <div class="display col-md-12">
        <input type="text" name="phone" id="phone" v-model="phone">
        <span class="btn-remove" v-on:click="backspace()"><img src="../assets/dialpad-icon-erase.png" alt=""></span>
    </div>
    <div class="col-md-12">
        <div class="dialpad" v-on:click="dialpadEvent($event)">
            <div class="dial-row">
                <div class="dial-cell" data-value="1">
                    <span class="dial-number">1</span>
                    <span class="dial-text"></span>
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
    </div>
    <div class="col-md-12">
        <button class="btn btn-primary btn-block" v-on:click="dial()">Call</button>
    </div>
</div>
<campaign-selector v-show="dialAction=='selectCampaign'"></campaign-selector>
</template>

<script>
export default {
  name: "DialPad",
  data() {
    return {
      dialAction: ''
    };
  },
  methods: {
    backspace() {

    },
    dialpadEvent() {

    },
    dial() {

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  width: 100%;
  min-height: 1034px;
  min-width: 1711px;
}
</style>
