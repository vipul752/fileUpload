const mongoose = require("mongoose");
const sendMail = require("../config/sendMail");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

fileSchema.post("save", async function (doc) {
  await sendMail(doc);
});

module.exports = mongoose.model("File", fileSchema);
