const dotenv = require('dotenv');
dotenv.config();

const { isAuthorized } = require('./tokenFunc');
const users = require('../models/user');
const hackerpunk = require('hackerpunk-api');
const external_abi = require('../abi/ehp_abi.json');

const connect = async (req, res) => {
    try{
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        await users
            .findOne({'userId': id})
            .then( async (user) => {
                if (user.userPubKey !== '0x0'){
                    res.status(400).json({message: 'fail, already registered'});
                    console.log('fail, already registered');
                    return;
                }
    
                const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN_HTTPS);
                const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                const signer = hackerpunk.setSigner(wallet, provider);
                const ehp = new hackerpunk.ExternalHP(signer, process.env.EHP_ADDRESS, external_abi);
    
                let sign;
                let privKey = '0x' + user.servUserPrivKey;
                try{
                    sign = await ehp.getSignature(String(provider), String(user.servUserPubKey), String(privKey));
                }
                catch(err){
                    res.status(500).json({message: 'fail'});
                    console.error(err);
                    return;
                }
                res.status(200).json({'sign': sign, message: 'succeed'});
                console.log('succeed, sent sign');
                return;
            })
            .catch((err) => {
                res.status(500).json({message: 'fail'});
                console.error(err);
                return;
            })
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

module.exports = {
    connect
};