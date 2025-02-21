const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURI = process.env.MONGO_DB_URI;
// const mongoURI = "mongodb://localhost:27017/mdevisor";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database Connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectToMongo;
