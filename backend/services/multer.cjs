// Module pour gérer les opérations sur les fichiers
const fs = require('fs')

// Module pour gérer l'upload de fichiers
const multer = require('multer')

// Module pour gérer les chemins de fichiers
const path = require('path')

// Définir le chemin du dossier ou seront stockés les fichiers uploadés
const uploadFolder = path.join(__dirname, '../uploads');

// Vérifier si le dossier uploads existe, sinon on le créer
if(!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
    console.log('Dossier "upload" créé');
}

const storage = multer.diskStorage({
    // Définir la destination des fichiers uploadés
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    // Définir le nom des fichiers uploadés
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Créer l'instance multer avec la configuration du stockage
const upload = multer({ storage: storage });

// Exporter le middleware multer configuré
module.exports = upload;