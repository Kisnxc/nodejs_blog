const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const {requireAuth, checkUser} = require('../app/middlewares/authMiddleware');


router.get('/search', siteController.search);
router.get('/home', siteController.index);
router.get('/', siteController.index);


module.exports = router;
