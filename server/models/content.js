const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    no: Number,
    id: String,
    title: String,
    date: String,
    views: String,
    content: String,
});

module.exports = mongoose.model('Content', contentSchema);