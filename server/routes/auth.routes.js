const express = require('express');
const controller = require('../controllers/auth.controllers');
const schemas = require('../validation/auth.schemas');
const validator = require('../middleware/schemas.middleware');

const router = express.Router();

router.post(
  '/login',
  validator(schemas.loginForm, 'body'),
  controller.login,
);

router.post(
  '/register',
  validator(schemas.registerForm, 'body'),
  controller.register,
);

router.post('/google', controller.googleLogin);

module.exports = router;
