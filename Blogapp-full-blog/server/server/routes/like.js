const express = require("express"),
  router = express.Router();
const Controller = require("../controllers/like");
const checkAuthMiddleware = require('../middleware/check-auth');

router.post("/:userId/:postId",Controller.like);
router.get("/:id",Controller.getLikebyPost)
router.get("/:userid/:postid",Controller.getLikebyUser)
module.exports = router;
