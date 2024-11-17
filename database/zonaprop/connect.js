const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    console.log(`# INFO: Connecting to MongoDB: ${uri}`);
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

module.exports = connectDB;
