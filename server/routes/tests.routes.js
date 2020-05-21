const express = require('express');
const passport = require('passport');
const controller = require('../controllers/tests.controllers');

const router = express.Router();

router.get(
  '/all',
  passport.authenticate('jwt', {
    session: false
  }),
  controller.getAll
);


router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  controller.create
);


router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  controller.getUserTests
);

router.delete(
  '/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  controller.deleteById
);

router.put(
  '/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  controller.updateById
);

module.exports = router;
