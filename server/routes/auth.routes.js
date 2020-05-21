const express = require('express');
const passport = require('passport');
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

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));


router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://localhost:4200/login'
  }),
  (req, res) => {
    res.redirect('https://localhost:4200/home');
  });

module.exports = router;
