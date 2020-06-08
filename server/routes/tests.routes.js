const express = require('express');
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/tests.controllers');

const router = express.Router();

router.get('/all', auth, controller.getAll);

router.post('/', auth, controller.create);

router.get('/', auth, controller.getUserTests);

router.delete('/:id', auth, controller.deleteById);

router.put('/:id', auth, controller.updateById);

router.post('/results', auth, controller.setResults);

module.exports = router;
