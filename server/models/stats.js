const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    id: String,
    users: String,
    contents: { type: Number, default: 0 }
});

module.exports = mongoose.model('Stats', statsSchema);