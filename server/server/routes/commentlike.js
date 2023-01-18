const express = require("express"),
  router = express.Router();
const Controller = require("../controllers/commentlike");
const checkAuthMiddleware = require('../middleware/check-auth');

router.post("/:userId/:postId/:commentId/commentlike", checkAuthMiddleware.checkAuth,Controller.commentlike);
router.delete("/:commentlikeId/commentunlike", checkAuthMiddleware.checkAuth,Controller.commentunlike);
module.exports = router;
