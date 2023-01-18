const express = require("express"),
  router = express.Router();
const Controller = require("../controllers/comment");
const checkAuthMiddleware = require('../middleware/check-auth');

router.get("/:id",Controller.getComments);
router.get("/getAll", Controller.getAll);
router.post("/:userId/:postId/create", checkAuthMiddleware.checkAuth,Controller.create);
router.put("/:commentId/update", checkAuthMiddleware.checkAuth,Controller.update);
router.delete("/:commentId/delete", checkAuthMiddleware.checkAuth,Controller.delete);
module.exports = router;
