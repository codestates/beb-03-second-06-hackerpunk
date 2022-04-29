const users = require('../models/user');
const { isAuthorized } = require('./tokenFunc');
const dotenv = require('dotenv');
dotenv.config();

const hackerpunk = require('hackerpunk-api');
const external_abi = require('../abi/ehp_abi.json');

const connect = async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        console.log('invalid access token');
        return;
    }
    const { id } = accessTokenData;

    users
        .findOne({'userId': id})
        .then( async (user) => {
            if (user.userPubKey !== '0x0'){
                res.status(400).json({message: 'fail'});
                console.log('already registered');
                return;
            }

            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN_HTTPS);
            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
            const signer = hackerpunk.setSigner(wallet, provider);
            const ehp = new hackerpunk.ExternalHP(signer, process.env.EHP_ADDRESS, external_abi);

            let sign;
            let privKey = '0x' + user.servUserPrivKey;
            sign = await ehp.getSignature(String(provider), String(user.servUserPubKey), String(privKey));
            console.log(sign);
            res.status(200).json({"sign": sign});
            //res.status(200).json({"hashed_message": sign.hashedMessage});
            console.log('sent sign');
            return;
        })
}

module.exports = {
    connect
};