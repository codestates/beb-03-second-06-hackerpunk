const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    email: String,
    addr: String,
    //status: String,
    //auth: String
});

module.exports = mongoose.model('User', userSchema);