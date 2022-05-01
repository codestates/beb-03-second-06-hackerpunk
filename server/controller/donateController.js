const dotenv = require('dotenv');
dotenv.config();

const { isAuthorized } = require('./tokenFunc');
const hackerpunk = require('hackerpunk-api');
const hptl_abi = require('../abi/hptimelock_abi.json');
const users = require('../models/user');
const articles = require('../models/article');

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

                await articles
                        .findOne({'no': article_id})
                        .then( async (article) => {
                            if (!article){
                                res.status(400).json({message: 'fail, no matching article'});
                                console.log('fail, no matching article');
                                return;
                            }
                            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                            const signer = hackerpunk.setSigner(wallet, provider);
                            const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);

                            try{
                                let status = await hptl.checkDonationStatus(Number(article_id));
                                if (status == 0){
                                    article.donateEnd = Date.now() + process.env.LOCK_TIME; // unit : [ms]
                                    await article.save();
                                }

                                await hptl.donate(Number(article.no), article.author, user.servUserPubKey, String(amount * (10 ** 18)))
                            }
                            catch(err){
                                res.status(400).json({message: 'fail'});
                                console.error(err);
                                return;
                            }

                        })
                        .catch((err) => {
                            res.status(500).json({message: 'fail, donate'});
                            console.error(err);
                            return;
                        })
                
                user.donateArticles.push(Number(article_id));
                await user.save();
                
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

                    let temp = user.donateArticles;
                    user.donateArticles = temp.filter((item) => {
                        return item !== Number(article_id);
                    });
                    await user.save();
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
                    user.rewardedArticles.push(Number(article_id));
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