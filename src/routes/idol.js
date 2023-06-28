const express = require('express');
const router = express.Router();
const idolController = require('../app/controllers/IdolController');
const {requireAuth, checkUser} = require('../app/middlewares/authMiddleware');

router.post('/handle-form-action',requireAuth,idolController.handleFormActions);
router.patch('/:id/restore', requireAuth,idolController.restore);
router.delete('/:id/force', requireAuth,idolController.forceDestroy);
router.delete('/:id', requireAuth,idolController.delete);
router.get('/:id/edit', requireAuth,idolController.edit);
router.put('/:id', requireAuth,idolController.update);
router.get('/create',requireAuth, idolController.create);
router.post('/stored',requireAuth, idolController.stored);
router.get('/:slug', idolController.show);



module.exports = router;
