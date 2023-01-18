const express = require('express'),
	router = express.Router();
const Controller = require('../controllers/permission');
const checkAuthMiddleware = require('../middleware/check-auth');

router.get('/getAll', Controller.getAll);
router.post('/create',Controller.create);
router.delete('/:permissionId/delete',Controller.delete);
router.put('/:permissionId/update',Controller.update);

module.exports = router;
