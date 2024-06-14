const express=require("express");
const router = express.Router();
const uploadComment = require("./uploadComment");


router.post("/:id",uploadComment);


module.exports=router;