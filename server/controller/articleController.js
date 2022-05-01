const dotenv = require('dotenv');
dotenv.config();

const { isAuthorized } = require('./tokenFunc');
const articles = require('../models/article');
const users = require('../models/user');
const hackerpunk = require('hackerpunk-api');
const hp_abi = require('../abi/hp_abi.json');
const hptl_abi = require('../abi/hptimelock_abi.json');

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

const create = async (req, res) => {
    try{
        const { article_title, article_content } = req.body;
        if (!article_title || !article_content) {
            res.status(400).json({message: 'fail, need article_title and article_content'});
            console.log('fail, need article_title and article_content');
            return;
        }
    
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        const articleModel = new articles();
        articleModel.no = await articles.countDocuments({}) + 1;
        articleModel.author = id;
        articleModel.title = article_title;
        articleModel.views = 0;
        articleModel.content = article_content;
        articleModel.deleted = 0;
    
        await articleModel
            .save()
            .then( async (article) => {
                try{
                    const user = await users.findOne({"userId": id});
                    user.userArticles.push(article.no);
                    await user.save();
                }
                catch(err){
                    res.status(400).json({message: 'fail'});
                    console.error(err);
                    return;
                }
    
                res.status(200).json({message:'succeed, create article'});
                console.log('succeed, create article');
                return;
            })
            .catch((err) => {
                res.status(500).json({message: 'fail'});
                console.error(err);
                return;
            });
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

const read = async (req, res) => {
    try{
        let maxNum = await articles.countDocuments({});

        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;

        if (req.query.article_id) {
            await articles
                .findOne({"no": Number(req.query.article_id)})
                .then( async (article) => {
                    if (!article){
                        res.status(400).json({message: 'fail, no matching article'});
                        console.log('fail no matching article');
                        return;
                    }
                    else if (article.deleted){
                        res.status(400).json({message: 'fail, deleted article'});
                        console.log('fail, deleted article');
                        return;
                    }
                    else {
                        try{
                            article.views = article.views + 1;
                            await article.save();
        
                            let box = [];
                            box.push({"max_comment_id": article.comments.length})
                            let idx = 1;
                            for (const elem of article.comments){
                                if (elem.deleted){
                                    continue;
                                }
                                let temp = {};
                                temp.new_id = idx;
                                idx++;
                                temp.comment_id = elem.no;
                                temp.comment_author = elem.author;
                                temp.comment_title = elem.title;
                                temp.comment_content = elem.content;
                                temp.comment_created_at = elem.createdAt;
                                temp.comment_updated_at = elem.updatedAt;
                                box.push(temp);
                            }
        
                            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                            const signer = hackerpunk.setSigner(wallet, provider);
                            const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
                            const donated = await hptl.getDonationBalance(req.query.article_id);

                            res.status(200).json({"max_article_id": maxNum,
                                                    "article_id": article.no,
                                                    "article_author": article.author,
                                                    "article_title": article.title,
                                                    "article_views": article.views,
                                                    "article_content": article.content,
                                                    "article_donated": Number(cutting(donated.toString())),
                                                    "article_created_at": article.createdAt,
                                                    "article_updated_at": article.updatedAt,
                                                    "article_comments": box
                            });
                            console.log('succeed, read one article');
                            return;
                        }
                        catch(err){
                            res.status(400).json({message: 'fail'});
                            console.error(err);
                            return;
                        }
                    }
                })
                .catch((err) => {
                    res.status(500).json({message: 'fail'});
                    console.error(err);
                    return;
                });
        }
        else if (req.query.article_author) {
            await articles
                .find({"author": req.query.article_author})
                .then((results) => {
                    let box = [];
                    box.push({"max_author_article_id": results.length});//작가가 쓴 게시물 개수
                    let idx = 1;
                    for (const elem of results){
                        if (elem.deleted){
                            continue;
                        }
                        let temp = {};
                        temp.new_id = idx;
                        idx++;
                        temp.article_id = elem.no;
                        temp.article_author = elem.author;
                        temp.article_title = elem.title;
                        temp.article_views = elem.views;
                        temp.article_created_at = elem.createdAt;
                        temp.article_updated_at = elem.updatedAt;
                        box.push(temp);
                    }
                    res.status(200).json(box);
                    console.log('succeed');
                    return;
                })
                .catch((err) => {
                    res.status(500).json({message: 'fail'});
                    console.error(err);
                    return;
                });
        }
        else if (req.query.amount) {
            let box = {};
            let userBox = [];

            await articles
                .find({"author": id})
                .then((results) => {
                    let idx = 1;
                    for (const elem of results){
                        if (elem.deleted){
                            continue;
                        }
                        let temp = {};
                        temp.new_id = idx;
                        idx++;
                        temp.article_id = elem.no;
                        temp.article_author = elem.author;
                        temp.article_title = elem.title;
                        temp.article_views = elem.views;
                        temp.article_created_at = elem.createdAt;
                        temp.article_updated_at = elem.updatedAt;
                        userBox.push(temp);
                    }
                })
                .catch((err) => {
                    res.status(500).json({message: 'fail'});
                    console.error(err);
                    return;
                });
            
            try{
                const user = await users.findOne({"userId": id});
    
                const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                const signer = hackerpunk.setSigner(wallet, provider);
                const hp = new hackerpunk.HP(signer, process.env.HP_ADDRESS, hp_abi);
                console.log(user.servUserPubKey);
                let tempAmount = await hp.balanceOf(user.servUserPubKey);
                console.log(tempAmount.toString());
                let tempLevel = parseInt(user.userDonated / 50);
        
                box['user'] = {'id': user.userId,
                            'email': user.userEmail,
                            'internal_pub_key': user.servUserPubKey,
                            'external_pub_key': user.userPubKey,
                            'amount': Number(cutting(tempAmount.toString())), 
                            'level': tempLevel,
                            'user_article': userBox
                            };
            }
            catch(err){
                res.status(400).json({message: 'fail'});
                console.error(err);
                return;
            }
    
            box['max_article_id'] = maxNum;

            let query;
            if (req.query.num){
                query = {'deleted': 0, 'no': {'$lte': req.query.num}}
            }
            else {
                query = {'deleted': 0}
            }

            let article_box = [];
            await articles
                .find(query)
                .sort({"no": -1})
                .limit(req.query.amount)
                .then( async (results) => {
                    let idx = 1;
                    for (const elem of results){
                        let temp = {};
                        temp.new_id = idx;
                        idx++;
                        temp.article_id = elem.no;
                        temp.article_author = elem.author;
                        temp.article_title = elem.title;
                        temp.article_views = elem.views;
                        temp.article_created_at = elem.createdAt;
                        temp.article_updated_at = elem.updatedAt;
                        article_box.push(temp);
                    }
                    box['articles'] = article_box;
                    res.status(200).json(box);
                    console.log('succeed');
                    return;
                })
                .catch((err) => {
                    res.status(500).json({message: 'fail'});
                    console.error(err);
                    return;
                });
        }
        else {
            res.status(400).json({message: 'fail, wrong request'});
            console.log('fail, reach the end');
            return;
        }
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

const update = async (req, res) => {
    try{
        const { article_id, article_title, article_content } = req.body;
        if (!article_id || !article_title || !article_content) {
            res.status(400).json({message: 'fail, article_id, article_title, article_content'});
            console.log('fail, article_id, article_title, article_content');
            return;
        }
    
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        try{
            const article = await articles.findOne({"no": article_id});
            if (article.author !== id || article.deleted){
                res.status(400).json({message: 'fail, wrong author or deleted article'});
                console.log('fail, wrong author or deleted article');
                return;
            }
            article.title = String(article_title);
            article.content = String(article_content);
            await article.save();
        }
        catch(err){
            res.status(400).json({message: 'fail'});
            console.error(err);
            return;
        }

        res.status(200).json({message:'succeed, update'});
        console.log('succeed, update');
        return;
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

const del = async (req, res) => {
    try{
        const { article_id } = req.body;
        if (!article_id) {
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
    
        try{
            const article = await articles.findOne({'no': article_id});
            if (article.author !== id || article.deleted){
                res.status(400).json({message: 'fail, wrong author or deleted article '});
                console.log('fail, wrong author or deleted article ');
                return;
            }
            article.deleted = 1;
            await article.save();
        
            const user = await users.findOne({"userId": id});
        
            const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
            const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
            const signer = hackerpunk.setSigner(wallet, provider);
            const hptl = new hackerpunk.HPTimeLock(signer, process.env.HPTL_ADDRESS, hptl_abi);
            
            let status = await hptl.checkDonationStatus(Number(article_id));
            if (status == 1){
                await hptl.revokeAll(Number(article_id), user.servUserPubKey);
            }
            
        
            let temp = user.userArticles;
            user.userArticles = temp.filter((item) => {
                return item !== Number(article_id);
            });
            await user.save();
        }
        catch(err){
            res.status(500).json({message: 'fail'});
            console.error(err);
            return;
        }

        res.status(200).json({message:'succeed, delete'});
        console.log('succeed, delete');
        return;
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

module.exports = {
    create,
    read,
    update,
    del
}