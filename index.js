const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const upload = require("./routes/FileUpload");

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.cloudinaryConnect();
connectDB();

app.use("/api/v1/upload", upload);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
