const dotenv = require('dotenv');
dotenv.config();

const { isAuthorized } = require('./tokenFunc');
const hackerpunk = require('hackerpunk-api');
const hp_abi = require('../abi/hp_abi.json');
const hptl_abi = require('../abi/hptimelock_abi.json');
const users = require('../models/user');

const cutting = function (num) {
    let res;
    if (num.length < 16){
      res= '0';
    }
    else if (num.length > 18){
       res = num.slice(0,-18) + '.' + num.slice(-18, -15);
    }
    else if (num.length == 18){
      res = '0.' + num.slice(0, -15);
    }
    else if (num.length == 17){
      res = '0.0' + num.slice(0, -15);
    }
    else if (num.length == 16){
      res = '0.00' + num.slice(0, -15);
    }
    return res;
};

const donate = async (req, res) => {
    try{
        const { article_id, amount } = req.body;
        if (!article_id || !amount){
            res.status(400).json({message: 'fail, need article_id & amount'});
            console.log('fail, need article_id & amount');
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
                const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
    
                const userWallet = hackerpunk.setWallet(user.servUserPrivKey);
                const userSigner = hackerpunk.setSigner(userWallet, provider);
                const hp = new hackerpunk.HP(userSigner, process.env.HP_ADDRESS, hp_abi);

                try{
                    await hptl.donate(hp, Number(article_id), user.servUserPubKey, String(amount * (10 ** 18)));
                }
                catch(err){
                    res.status(400).json({message: 'fail, you need more eth in internalAddress'});
                    console.log('fail,\n', err);
                    return;
                }

                res.status(200).json({messsage: 'succeed, donate'});
                console.log('succeed, donate');
                return;
            })
            .catch((err)=>{
                res.status(500).json({message: 'fail, donate'});
                console.log('fail,\n', err);
                return;
            })
    }
    catch(err) {
        res.status(500).json({message: 'fail, donate'});
        console.log('fail,\n', err);
        return;
    }
};


const cancel = async (req, res) => {
    try{
        const { article_id } = req.body;
        if (!article_id){
            res.status(400).json({message: 'fail, need article_id'});
            console.log('fail, need article_id');
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
                const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
    
                try{
                    await hptl.revokeDonate(Number(article_id), user.servUserPubKey);
                }
                catch(err){
                    res.status(400).json({message: 'fail, cancel'});
                    console.log('fail,\n', err);
                    return;
                }
                
                res.status(200).json({messsage: 'succeed, cancel'});
                console.log('succeed, cancel');
                return;
            })
            .catch((err)=>{
                res.status(500).json({message: 'fail, cancel'});
                console.log('fail,\n', err);
                return;
            })
    }
    catch(err){
        res.status(500).json({message: 'fail, cancel'});
        console.log('fail,\n', err);
        return;
    }
}

const reward = async (req, res) => {
    try{
        const { article_id } = req.body;
        if (!article_id){
            res.status(400).json({message: 'fail, need article_id'});
            console.log('fail, need article_id');
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
                const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
    
                try{
                    await hptl.release(Number(article_id), user.servUserPubKey);
                    const totalDonated = await hptl.getDonationBalance(Number(article_id));
                    user.userDonated = user.userDonated + Number(cutting(totalDonated.toString()));
                    await user.save();
                }
                catch(err){
                    res.status(400).json({message: 'fail, reward'});
                    console.log('fail,\n', err);
                    return;
                }
    
                res.status(200).json({messsage: 'succeed, reward'});
                console.log('succeed, reward');
                return;
            })
            .catch((err)=>{
                res.status(500).json({message: 'fail, reward'});
                console.log('fail,\n', err);
                return;
            })
    }
    catch(err){
        res.status(500).json({message: 'fail, reward'});
        console.log('fail,\n', err);
        return;
    }
}

module.exports = {
    donate,
    cancel,
    reward,
};