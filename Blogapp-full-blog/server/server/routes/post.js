const express = require("express");
router = express.Router();
const Controller = require("../controllers/post");
const checkAuthMiddleware = require('../middleware/check-auth');
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
});
const upload = multer({ storage: fileStorageEngine })
router.get("/getAll", Controller.getAll);
router.get("/:id", Controller.getPost);
router.get("/category/:id",Controller.getPostbyCategory)
router.post("/:userId/:categoryId/create", checkAuthMiddleware.checkAuth, upload.single('picture'), Controller.create);
router.delete("/:postId/delete", checkAuthMiddleware.checkAuth,Controller.delete);
router.put("/:postId/update", checkAuthMiddleware.checkAuth,upload.single('picture'),Controller.update);

module.exports = router;
