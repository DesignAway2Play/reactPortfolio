const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts')
const profileController = require('../controllers/profiles')

router.get('/profile/:id', profileController.getProfile);
router.get('/works', postsController.getAllWorks);

router.post('/profile', profileController.create);
router.post('/works', postsController.create);


module.exports = router;