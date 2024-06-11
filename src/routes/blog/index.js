const upload = require("../../multer/index");
const express = require("express");
const { tokenVerification } = require("../../middleware");
const uploadBlog = require("./uploadBlog");
const getBlog = require("./getBlog");
const updateBlog = require("./updateBlog");
const router = express.Router();

router.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  uploadBlog
);
router.get("/get-news", getBlog);
router.put("/blogs/:blogId", tokenVerification, updateBlog);

module.exports = router;
