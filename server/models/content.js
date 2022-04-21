const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    no: String,
    author: String,
    title: String,
    date: String,
    views: String
});

module.exports = mongoose.model('Content', contentSchema);