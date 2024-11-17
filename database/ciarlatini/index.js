const serviceMongoDB = ({ collectionName }) => ({
  createCollection: async () => {
    try {
        console.log("INFO | #Collection name: ", collectionName);
        console.log(`# Collection created #`);
    } catch (error) {
      console.error(`INFO | # ERROR: ${error}`);
    }
  },
});
