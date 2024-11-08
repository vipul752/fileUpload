const express = require("express");
const router = express.Router();
const {
  localImageUpload,
  imageUpload,
  videoUpload,
  reduceImageUpload,
  getallFiles,
} = require("../controller/fileupload");

router.post("/localImage", localImageUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/reduceImageUpload", reduceImageUpload);
router.get("/getallFiles", getallFiles);

module.exports = router;
