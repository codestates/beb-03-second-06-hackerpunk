const users = require('../models/user');
const { isAuthorized } = require('./tokenFunc');

const dotenv = require('dotenv');
dotenv.config();
const hackerpunk = require('hackerpunk-api');
const hptl_abi = require('../abi/hptimelock_abi.json');
const hp_abi = require('../abi/hp_abi.json');

// ///////
// const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
// const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
// const signer = hackerpunk.setSigner(wallet, provider);
// const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
// ///////

const donate = async (req, res) => {
    const { article_id, amount } = req.body;

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    users
        .findOne({"userId": id})
        .then( async (user) => {
            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
            const signer = hackerpunk.setSigner(wallet, provider);
            const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);

            const userWallet = hackerpunk.setWallet(user.servUserPrivKey);
            const userSigner = hackerpunk.setSigner(userWallet, provider);
            const hp = new hackerpunk.HP(userSigner, process.env.HP_ADDRESS, hp_abi);

            await hptl.donate(hp, article_id, user.servUserPubKey, amount);
            res.status(200).json({messsage: 'succeed'});
            console.log('donate succeed');
            return;
        })

};


const cancel = async (req, res) => {
    const { article_id } = req.body;

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    users
        .findOne({"userId": id})
        .then( async (user) => {
            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
            const signer = hackerpunk.setSigner(wallet, provider);
            const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);

            await hptl.revokeDonate(article_id, user.servUserPubKey);
            res.status(200).json({messsage: 'succeed'});
            console.log('cancel succeed');
            return;
        })
}

const reward = async (req, res) => {
    const { article_id } = req.body;

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    users
        .findOne({"userId": id})
        .then( async (user) => {
            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
            const signer = hackerpunk.setSigner(wallet, provider);
            const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);

            await hptl.release(article_id, user.servUserPubKey);
            const totalDonated = await hptl.getDonationBalance(article_id);
            user.userDonated = user.userDonated + totalDonated;
            await user.save();

            res.status(200).json({messsage: 'succeed'});
            console.log('cancel succeed');
            return;
        })
}

module.exports = {
    donate,
    cancel,
    reward,
};