const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// const { storage } = require('./storage/storage');

// Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function sendFile(file) {
  const result = cloudinary.uploader.upload(file.path, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
    folder: "files",
  });

  return result;
}

module.exports = { sendFile, upload };
