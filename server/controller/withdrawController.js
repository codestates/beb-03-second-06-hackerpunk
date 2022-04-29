const users = require('../models/user');
const { isAuthorized } = require('./tokenFunc');

const dotenv = require('dotenv');
dotenv.config();
const hackerpunk = require('hackerpunk-api');
const hp_abi = require('../abi/hp_abi.json');

const withdraw = async (req, res) => {
    const { amount } = req.body;
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        console.log('invalid access token');
        return;
    }
    const { id } = accessTokenData;

    users
        .findOne({"userId": id})
        .then( async (user) => {
            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
            const wallet = hackerpunk.setWallet(users.servUserPrivKey);
            const signer = hackerpunk.setSigner(wallet, provider);
            const hp = new hackerpunk.HP(signer, process.env.HP_ADDRESS, hp_abi);
            await withdrawToExternalAddress(signer, users.userPubKey, amount);
            res.status(200).json({message: 'succeed'});
            console.log('withdraw succeed');
            return;
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR compare] \n', err);
            return;
        })
}

module.exports = {
    withdraw
};