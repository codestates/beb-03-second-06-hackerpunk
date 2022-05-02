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
        
        if (amount < 0.1){
            res.status(400).json({message: 'fail, minimum donate amount is 0.1'});
            console.log('fail, minimum donate amount is 0.1');
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

                if (user.userAction){
                    res.status(400).json({message: 'fail, Now processing... please wait'});
                    console.log('fail, Now processing... please wait');
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
                                    article.donateEnd = Number(Date.now()) + Number(process.env.LOCK_TIME); // unit : [ms]
                                    await article.save();
                                }
                                
                                let stop = await hptl.donate(Number(article.no), article.authorPubKey, user.servUserPubKey, String(amount * (10 ** 18)));
                                stop
                                    .wait()
                                    .then(()=>{
                                        user.donateArticles.push(Number(article_id));
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    })
                                    .finally(() => {
                                        user.userAction = 0;
                                        user.save().catch(console.error);
                                    });
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
                
                user.userAction = 1;
                await user.save();
                res.status(200).json({messsage: 'wait, donate processing... '});
                console.log('wait, donate prcoessing... ');
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

                if (user.userAction){
                    res.status(400).json({message: 'fail, Now processing... please wait'});
                    console.log('fail, Now processing... please wait');
                    return;
                }

                const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                const signer = hackerpunk.setSigner(wallet, provider);
                const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
    
                try{
                    let stop = await hptl.revokeDonate(Number(article_id), user.servUserPubKey);
                    stop
                        .wait()
                        .then(()=>{
                            let temp = user.donateArticles;
                            user.donateArticles = temp.filter((item) => {
                                return item !== Number(article_id);
                            });
                        })
                        .catch(console.error)
                        .finally(() => {
                            user.userAction = 0;
                            user.save().catch(console.error);
                        })
                }
                catch(err){
                    res.status(400).json({message: 'fail, cancel'});
                    console.log('fail,\n', err);
                    return;
                }
                
                user.userAction = 2;
                await user.save();
                res.status(200).json({messsage: 'wait, cancel processing'});
                console.log('wait, cancel processing');
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

                if (user.userAction){
                    res.status(400).json({message: 'fail, Now processing... please wait'});
                    console.log('fail, Now processing... please wait');
                    return;
                }

                const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                const signer = hackerpunk.setSigner(wallet, provider);
                const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
    
                try{
                    let stop = await hptl.release(Number(article_id), user.servUserPubKey);
                    stop
                        .wait()
                        .then(async () => {
                            const totalDonated = await hptl.getDonationBalance(Number(article_id));
                            user.userDonated = user.userDonated + Number(cutting(totalDonated.toString()));
                            user.rewardedArticles.push(Number(article_id));
                        })
                        .catch(console.error)
                        .finally(() => {
                                user.userAction = 0;
                                user.save().catch(console.error);
                        })
                }
                catch(err){
                    res.status(400).json({message: 'fail, reward'});
                    console.log('fail,\n', err);
                    return;
                }
    
                user.userAction = 3;
                await user.save();
                res.status(200).json({messsage: 'wait, reward processing'});
                console.log('wait, reward processing');
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