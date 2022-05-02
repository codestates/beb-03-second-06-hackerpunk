const dotenv = require('dotenv');
dotenv.config();

const { isAuthorized } = require('./tokenFunc');
const users = require('../models/user');
const hackerpunk = require('hackerpunk-api');
const hp_abi = require('../abi/hp_abi.json');

const withdraw = async (req, res) => {
    try{
        const { amount } = req.body;
        if (!amount){
            res.status(400).json({message: 'fail, need amount'});
            console.log('fail, need amount');
            return;
        }

        if (amount < 0.5){
            res.status(400).json({message: 'fail, minimum withdraw amount is 0.5'});
            console.log('fail, minimum withdraw amount is 0.5');
            return;
        }
    
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        await users
            .findOne({"userId": id})
            .then( async (user) => {
                if (!user){
                    res.status(400).json({message: 'fail, no matching user'});
                    console.log('fail, no matching user');
                    return;
                }
                const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                const signer = hackerpunk.setSigner(wallet, provider);
                const hp = new hackerpunk.HP(signer, process.env.HP_ADDRESS, hp_abi);
                try{
                    await hp.withdrawToExternalAddress(user.servUserPubKey, user.userPubKey, String(amount * (10 ** 18)));
                }
                catch(err){
                    res.status(500).json({message: 'fail, withdraw'});
                    console.log('fail, withdraw');
                    return;
                }
                res.status(200).json({message: 'wait, withdraw processing'});
                console.log('wait, withdraw processing');
                return;
            })
            .catch((err) => {
                res.status(500).json({message: err});
                console.log('[ERROR compare] \n', err);
                return;
            })
    }
    catch(err){
        res.status(400).json({message: 'fail, withdraw'});
        console.log('fail,\n', err);
        return;
    }
}

module.exports = {
    withdraw
};