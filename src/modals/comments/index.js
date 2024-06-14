const mongoose = require("mongoose");
const commentSchema = require("./comment-schema");

const comments = mongoose.model("comment", commentSchema);

module.exports = comments;