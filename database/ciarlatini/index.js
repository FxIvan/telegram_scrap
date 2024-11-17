const serviceMongoDB = ({ collectionName }) => ({
  createCollection: async () => {
    try {
        console.log("INFO | #Collection name: ", collectionName);
    } catch (error) {
      console.error(`INFO | # ERROR: ${error}`);
    }
  },
});
