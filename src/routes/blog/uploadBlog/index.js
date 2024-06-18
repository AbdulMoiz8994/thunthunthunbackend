const blog = require("../../../modals/blog");
const fs = require("fs/promises");
const cloudinary = require("../../../multer/cloundnary");

const uploadBlog = async (req, res) => {
  try {
    console.log("req", req.body);
    const uploader = async (path, type) => await cloudinary.uploads(path, type);

    if (req.method === "POST") {
      const urls = [];
      const files = req.files;

      // Check if images exist and upload
      if (files.image) {
        for (const file of files.image) {
          const { path } = file;
          const newPath = await uploader(path, "Image");
          console.log("newPath", newPath);
          urls.push(newPath);
          await fs.unlink(path);
        }
      }

      // Check if video exists and upload
      let videoResult = null;
      if (files.video) {
        videoResult = await uploader(files.video[0].path, "Video");
        await fs.unlink(files.video[0].path);
      }

      console.log("urls", urls);

      if (urls.length > 0 || videoResult) {
        const finalRsp = {
          image: [],
          video: [],
          ...req.body,
        };

        if (videoResult) {
          let videoObjectUrl = {
            url: videoResult.url,
            id: videoResult.id,
          };
          finalRsp.video.push(videoObjectUrl);
        }

        for (let i = 0; i < urls.length; i++) {
          const imageObject = {
            url: urls[i].url,
            id: urls[i].id,
          };
          finalRsp.image.push(imageObject);
        }

        console.log("finalRsp", finalRsp);
        const newBlog = await blog.create(finalRsp);

        return res.status(201).json({
          status: 201,
          message: "Successfully added",
          data: newBlog,
        });
      } else {
        return res.status(400).json({ status: 400, message: "No images or videos uploaded" });
      }
    } else {
      return res.status(405).json({ status: 405, message: "Method not allowed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: err.message });
  }
};
module.exports = uploadBlog;
