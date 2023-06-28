const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const {requireAuth, checkUser} = require('../app/middlewares/authMiddleware');



router.get('/stored/idols',requireAuth, meController.storedIdols);
router.get('/trash/idols', requireAuth,meController.trashIdols);






module.exports = router;
