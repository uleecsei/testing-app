const express = require('express');
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/photo.controllers');
const upload = require('../middleware/upload.middleware');
const imageResize = require('../middleware/image-resize.middleware');

const router = express.Router();

router.put(
    '/',
    auth,
    upload.single('file'),
    // imageResize,
    controller.postPicture
    );

router.delete('/', auth, controller.deletePicture);

module.exports = router;
