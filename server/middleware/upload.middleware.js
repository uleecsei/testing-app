const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === ('image/jpeg' || 'image/png')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});
