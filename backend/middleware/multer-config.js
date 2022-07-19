const multer = require("multer");

// Définition des types de fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif"
};

// Mise en place de la logique multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const fileWithoutExtension = file.originalname.split(".")[0]; 
    const name = fileWithoutExtension.split(" ").join("_").split("-").join("_"); 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + ("_") + name + "." + extension);
  }
});

// Export de multer
module.exports = multer({ storage }).single("image");
