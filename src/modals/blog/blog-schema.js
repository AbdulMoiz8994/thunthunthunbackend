const mongoose = require("mongoose");
const schemaType = require("../../types");
const CommentSchema =require("../comments").schema;


const BlogSchema = new mongoose.Schema({
    title: {
        type: schemaType.TypeString
    },
    heading: {
        type: schemaType.TypeString
    },
    description: {
        type: schemaType.TypeString
    },
  
    image: [
        {
            url: {
                type: schemaType.TypeString // Image URL
            },
            id: {
                type: schemaType.TypeString,
                // required: true,
              },
        }
    ],
    video: [
        {
            url: {
                type: schemaType.TypeString // Image URL
            },
            id: {
                type: schemaType.TypeString,
                // required: true,
              },
        }
    ],
    comments: [CommentSchema],
    createdAt: {

        type: Date,
        default: Date.now(),
    }
});

module.exports = BlogSchema;