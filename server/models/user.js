const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    userPassword: String,
    userEmail: String,
    userDate: String,
    
    userDonated: Number, // calculate the level with donated tokens amount

    userPubKey: String,

    servUserPubKey: String,
    servUserPrivKey: String,
    servUserMnemonic: String,

    userArticles: [Number],
    userComments: [String],
});

module.exports = mongoose.model('User', userSchema);