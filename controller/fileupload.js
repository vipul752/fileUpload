const File = require("../model/file");
const cloudinary = require("cloudinary").v2;

exports.localImageUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);

    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    });

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function isFileSupported(type, supportedFile) {
  return supportedFile.includes(type);
}

async function uploadImageToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedFile = ["png", "jpg", "jpeg"];
    const type = file.name.split(".")[1];

    if (!isFileSupported(type, supportedFile)) {
      return res.status(400).json({ message: "File type not supported" });
    }

    const response = await uploadImageToCloudinary(file, "fileUpload");

    const newFile = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: newFile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    const supportedFile = ["mp4", "avi", "mov"];
    const type = file.name.split(".")[1].toLowerCase();

    if (!isFileSupported(type, supportedFile)) {
      return res.status(400).json({ message: "File type not supported" });
    }

    const response = await uploadImageToCloudinary(file, "fileUpload");

    const newFile = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: newFile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.reduceImageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedFile = ["png", "jpg", "jpeg"];
    const type = file.name.split(".")[1];

    if (!isFileSupported(type, supportedFile)) {
      return res.status(400).json({ message: "File type not supported" });
    }

    const response = await uploadImageToCloudinary(file, "fileUpload", 50);

    const newFile = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: newFile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getallFiles = async (req, res) => {
  try {
    const files = await File.find();

    res.status(200).json({
      success: true,
      message: "Files fetched successfully",
      data: files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


 