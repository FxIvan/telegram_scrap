const serviceMongoDB = ({ collectionName }) => ({
    createCollection: async () => {
      try {
        console.log("INFO | #Collection name: ", collectionName);
        console.log(`# Collection created #`);
      } catch (error) {
        console.error(`# ERROR: ${error}`);
      }
    },
  });
  

module.exports = serviceMongoDB;