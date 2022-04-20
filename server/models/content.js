const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
    no: Number,
    author: String,
    title: String,
    date: Number,
    views: Number
});
module.exports = mongoose.model('Content', contentSchema);