const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    no: Number, // comment_id
    articleId: Number, // article_id
    author: String, // comment_author
    title: String, // comment_title
    content: String, // comment_content
    deleted: Boolean, // 0: false(available), 1: true(not available)
}, {timestamps: true}); //createdAt -> article_created_at, updatedAt -> article_updated_at

module.exports = mongoose.model('Comment', commentSchema);