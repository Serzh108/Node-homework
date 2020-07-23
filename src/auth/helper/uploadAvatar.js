// ==================== uploud avatar ==============
const multer = require('multer');
const path = require('path');
const { avatarGenerator } = require('./avatarGenerator');

avatarGenerator();

const storage = multer.diskStorage({
  destination: './src/public/images',
  filename: (req, file, callback) => {
    const { ext } = path.parse(file.originalname);
    return callback(null, Date.now() + ext);
  },
});
exports.upload = multer({ storage });
