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
            //const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN_HTTPS);
            // console.log('-----------1');
            // console.log(provider);
            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
            // console.log('-----------2');
            // console.log(wallet);
            const signer = hackerpunk.setSigner(wallet, provider);
            // console.log('-----------3')
            // console.log(signer);
            const ehp = new hackerpunk.ExternalHP(signer, process.env.EHP_ADDRESS, external_abi);
            // console.log('-----------4')
            // console.log(ehp);

            let sign;
            //let privKey = user.servUserPrivKey;
            let privKey = '0x' + user.servUserPrivKey;
            sign = await ehp.getSignature(String(provider), String(user.servUserPubKey), String(privKey));
            console.log(sign);
            res.status(200).json({"sign": sign});
            console.log('sent sign');
            return;
        })
}

module.exports = {
    connect
};