const express=require("express");
const router = express.Router();
const uploadComment = require("./uploadComment");
const getComments = require("./getComment");


router.post("/:id",uploadComment);
router.get("/:id",getComments)


module.exports=router;