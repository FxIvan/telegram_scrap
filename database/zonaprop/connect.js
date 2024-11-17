const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    console.log(`# INFO: Connecting to MongoDB`);
    const conn = await mongoose.connect(uri);
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

module.exports = connectDB;
