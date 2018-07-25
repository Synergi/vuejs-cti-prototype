// campaign/getters

const hasCampaigns = state => {
  return state.campains.length > 0 ? true : false;
};

export default {
  hasCampaigns
};
