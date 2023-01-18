const express = require('express'),
	router = express.Router();
const Controller = require('../controllers/rolehaspermission');
const checkAuthMiddleware = require('../middleware/check-auth');

router.get('/getAll', Controller.getAll);
router.post('/role/:roleId/permission/:permissionId' ,Controller.create);
router.delete('/:rolehaspermissionId/delete',Controller.delete);
module.exports = router;
