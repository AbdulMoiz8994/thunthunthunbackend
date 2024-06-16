// const Comment = require("../../../modals/comments");
const Blog = require("../../../modals/blog");
const { mongoose } = require("mongoose");


const getComments=async(req, res) =>{
    try{
      
        const { id } = req.params;
    
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid blog post ID' });
          }
    
        const blog = await Blog.findById(id);
    
        if (!blog) {
          return res.status(404).json({ msg: "Blog post not found" });
        }
        
        // console.log("blog",blog); 
    
        res.status(201).json({status: 200, comments: blog.comments, length: blog.comments.length});   


    }catch(err){
        return res.status(405).json({ status: 405, message: err.message });

    }
}
module.exports=getComments;