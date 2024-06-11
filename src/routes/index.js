const express=require("express");
const auth = require("./auth");
const admin = require("./admin");;
const news = require("./blog");
const router=express.Router();


router.use("/auth", auth);
router.use("/news", news);
router.use("/admin", admin);


// https://sportsmaster.onrender.com/

module.exports=router;