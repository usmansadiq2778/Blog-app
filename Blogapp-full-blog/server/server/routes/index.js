const express = require("express"),
  router = express.Router();

const userRoutes = require("./user");
const userprofileRoutes = require("./userprofile");
const categoryRoutes = require('./category');
const postRoutes = require('./post')
const commentRoutes = require('./comment')
const likeRoutes = require('./like')
const commentlikeRoutes = require('./commentlike')
const permissionRoutes = require('./permission');
const roleRoutes = require('./role');
const rolehaspermissionRoutes = require('./rolehaspermission');

router.use("/user", userRoutes);
router.use("/userprofile", userprofileRoutes);
router.use("/category", categoryRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);
router.use("/commentlike", commentlikeRoutes);
router.use('/rolehaspermission', rolehaspermissionRoutes);
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);

module.exports = router;
