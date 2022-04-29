const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //id: String,
    //password: String,
    //email: String,
    //addr: String,
    //status: String,
    //auth: String

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

// level 정보 업데이트 해야 함 ... userArticles 이거 어떻게 처리할지 contents와 연관지어 고민해야 함(본인이 단 댓글도 어떻게 처리할지 생각해봐야 함) ...