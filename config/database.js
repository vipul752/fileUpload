const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
