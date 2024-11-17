const mongoose = require("mongoose");
const { MONGO_URI_DB } = require("../../web/zonaprop/config");
const connectDB = require("./connect");
const urlSchema = require("./models/urlModels");

const serviceMongoDB = ({ collectionName }) => {
  try {
    if (!collectionName) {
      throw new Error("Collection name is required.");
    }
    connectDB(MONGO_URI_DB);
    const URL_Model =
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, urlSchema, collectionName);

    return {
      createdURL: async (url) => {
        try {
          const url_info = await URL_Model.create({ url });
          return url_info;
        } catch (error) {
          console.error(`# ERROR: ${error.message}`);
          throw error;
        }
      },
      findByURL: async (url) => {
        try {
          const url_info = await URL_Model.findOne({ url });
          return url_info;
        } catch (error) {
          console.error(`# ERROR: ${error.message}`);
          throw error;
        }
      },
    };
  } catch (error) {
    console.error(`# ERROR: ${error.message}`);
    throw error;
  }
};

module.exports = serviceMongoDB;
