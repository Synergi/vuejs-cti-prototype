<template>
  <div>
    <b-modal v-model="showModal" @hidden="onHidden">
      <div class="modal-header">
        <span class="title" v-hide="search" v-on:click="initSearch()">Select a campaign</span>
        <input type="text" name="campaignSearch" ref="campaignSearch" class="input-search" v-model="searchText" v-show="search">
        <span class="btn-search" v-on:click="initSearch()">
          <i class="glyphicon" ng-class="{'glyphicon-search':  !search, 'glyphicon-remove': search}"></i>
        </span>
      </div>
      <div class="modal-body">
        <ul v-on:click="selectCampaign($event)">
          <li v-for="item in filteredItems" v-bind:key="item.id">
            <a data-id="item.id" href="#">{{item.title}}</a>
          </li>
          <li v-show="filteredItems.length == 0">
            <span class="item-description">No campaigns found.</span>
          </li>
        </ul>
      </div>
      <div class="modal-footer text-right">
          <span class="text-danger pointer" data-id="" v-on:click="selectCampaign($event)">Skip campaign</span>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import bModal from "bootstrap-vue/es/components/modal/modal";
import store from "../store";

export default {
  name: "CampaignSelector",
  data() {
    return {
      campaigns: [
        { id: 1, title: "Buyer protection" },
        { id: 1, title: "Google Analytics" },
        { id: 1, title: "Customer support" },
        { id: 1, title: "Black Friday" },
        { id: 1, title: "Amazing discount" }
      ],
      search: false,
      searchText: ""
    };
  },
  components: {
    "b-modal": bModal
  },
  computed: {
    ...mapState({
      currentState: state => state.fsm.currentState,
      currentStatus: state => state.fsm.appState
    }),
    showModal(state) {
      return state.currentState === "onManualPreview";
    },
    searchFilter: function() {
      return this.campaigns.filter(function(text) {
        return text % 2 === 0;
      });
    },
    filteredItems() {
      return this.campaigns.filter(item => {
        return item.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  },
  methods: {
    initSearch() {
      this.search = !this.search;
      if (this.search) {
        setTimeout(function() {
          this.$refs.campaignSearch.focus();
        }, 200);
      } else {
        this.resetSearch();
      }
    },
    selectCampaign(e) {},
    resetSearch() {
      this.search = false;
      this.searchText = "";
    },
    onHidden(evt) {
      // Cancel ManualPreview
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  width: 100%;
}
</style>
