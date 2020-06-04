const express = require('express');
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/photo.controllers');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.put(
    '/',
    auth,
    upload.single('file'),
    controller.postPicture
    );

router.delete('/', auth, controller.deletePicture);

module.exports = router;
