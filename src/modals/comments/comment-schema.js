const mongoose = require("mongoose");
const schemaType = require("../../types");

const CommentSchema = new mongoose.Schema({
  author: { type: schemaType.TypeString, required: true },
  content: { type: schemaType.TypeString, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = CommentSchema;
