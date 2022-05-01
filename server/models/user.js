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

    donateArticles: [Number], // 역대 donate한 모든 article_id를 가지고 있음. 그런데 유저 정보에
                              // 표기할 때는, 환불요청기간 지난 artilce_id는 보여주지 않고, 오직
                              // donate_proceeding 상태인 경우만 표시해 줌.
    
    rewardedArticles: [Number], // 본인이 작성해서 reward까지 받은 article_id들

    userArticles: [Number],
    userComments: [String],
});

module.exports = mongoose.model('User', userSchema);