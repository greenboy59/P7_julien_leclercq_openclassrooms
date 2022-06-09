const multer = require('multer');

// Définition des types de fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Mise en place de la logique multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => { 
    const fileWithoutExtension = file.originalname.split('.')[0]; // Récupération du fichier sans son extension d'origine
    const name = fileWithoutExtension.split(' ').join('_').split('-').join('_'); // Construction du nouveau nommage pour le stockage
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + ('_') + name + '.' + extension); // Date.now nombre de millisecondes écoulées depuis le 1er Janvier 1970
  }
});

// Export de multer
module.exports = multer({ storage }).single('image');