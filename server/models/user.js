const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    email: String,
    phone: String,
    addr: String
});

module.exports = mongoose.model('User', userSchema);