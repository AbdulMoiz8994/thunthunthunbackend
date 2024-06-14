const express=require("express");
const auth = require("./auth");
const admin = require("./admin");;
const news = require("./blog");
const uploadComment = require("./comment");
const router=express.Router();


router.use("/auth", auth);
router.use("/news", news);
router.use("/admin", admin);
router.use("/comments",uploadComment)


// https://sportsmaster.onrender.com/

module.exports=router;