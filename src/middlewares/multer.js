const multer = require('multer');
const path = require('path');

const maxSize = 50 * 1000 * 1000;

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { cb(null, './src/images')}, 
  filename: (req, file, cb) => { cb(null, file.fieldname + path.extname(file.originalname))} 
});

const upload = multer({
  storage: storage,
  limits: {fileSize:maxSize},
}).any();

module.exports = {
  upload
}