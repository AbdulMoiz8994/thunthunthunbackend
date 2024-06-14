const Comment = require("../../../modals/comments");
const Blog = require("../../../modals/blog");
const { mongoose } = require("mongoose");

const uploadComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid blog post ID' });
      }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    const newComment = new Comment({
      author,
      content,
    });

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    return res.status(405).json({ status: 405, message: err.message });
  }
};

module.exports = uploadComment;
