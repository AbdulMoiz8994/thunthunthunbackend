const User=require("../../../modals/user");
const fs = require("fs/promises");
const cloudinary = require("../../../multer/cloundnary");


const updateProfile = async (req, res) => {
  try {
    // console.log('req', req.body);
    let userId = await User.findOne({ _id: req.userId });
    // console.log('userId', userId, req.userId);
    if (!userId) {
      return res.status(404).json({ status: 404, message: 'User not Found' });
    }

    const uploader = async (path, type) => await cloudinary.uploads(path, type);

    if (req.method === 'PUT') {
      const file = req.file;

      // Check if image exists and upload
      if (file) {
        const { path } = file;
        const newPath = await uploader(path, 'Image');
        console.log('newPath', newPath);

        await fs.unlink(path);
        
        const imageObject = [
          {
          url: newPath.url,
          id: newPath.id,
        }
      ];

        // await fs.unlink(path);
           console.log("imageObject",imageObject);
        const updatedProfile = await User.findOneAndUpdate(
          { _id: req.userId }, // Filter criteria to find the user by ID
          {
            $set: {
              profilePicture: imageObject, // Update the profileImage field
            },
          },
          { new: true } // Return the modified document after update
        );

        updatedProfile.password = undefined;
        
        res.status(200).json({
          status: 200,
          data: updatedProfile,
          message: 'Successfully updated',
        });
      } else {
        return res.status(400).json({ status: 400, message: 'No file uploaded' });
      }
    } else {
      return res.status(405).json({ status: 405, message: 'Method not allowed' });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

  module.exports=updateProfile;