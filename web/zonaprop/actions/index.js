

const  dbHandler = require("../../../database/zonaprop/index")({collectionName: "rentals"});
const actions = {
  scrapActions: require("./scrapActions")({ dbHandler }),
};

module.exports = actions;
