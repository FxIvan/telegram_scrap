

const  dbHandler = require("../../../database/zonaprop/index")({collectionName: "ZONAPROP"});

const actions = {
  scrapActions: require("./scrapActions")({ dbHandler }),
};

module.exports = actions;
