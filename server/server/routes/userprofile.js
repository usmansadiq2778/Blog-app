const express = require("express"),
  router = express.Router();
const Controller = require("../controllers/userprofile");
const checkAuthMiddleware = require('../middleware/check-auth');
const multer = require ("multer");
const { default: file } = require("babel-core/lib/transformation/file");
const req = require("express/lib/request");
const res = require("express/lib/response");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './images')},
    filename:(req, file, cb) =>{
      cb(null,Date.now() + '--' + file.originalname)
    }
});

const upload = multer({storage:fileStorageEngine,fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}})

router.get('/:id',Controller.getUserprofile)
router.get('/getAll', Controller.getAll);
router.post('/:id',checkAuthMiddleware.checkAuth, upload.single('picture') ,Controller.createorupdate);
router.delete("/:userprofileId/delete",Controller.delete);
module.exports = router;
