const multer = require("multer");

const storage = multer.diskStorage({
  // destination:function(req,file, cb){
  //     cb(null,'./src/uploads/')
  // },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const filtFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("audio/") || 
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/avi" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/wmv"
  ) {
    cb(null, true);
  } else {
    //   prevent to upload
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: filtFilter,
});

module.exports = upload;
