const { isAuthorized } = require('./tokenFunc');
const articles = require('../models/article');
const comments = require('../models/comment')
const users = require('../models/user');
//const stats = require('../models/stats');

const create = async (req, res) => {
    const { article_title, article_content } = req.body;

    if (!article_title || !article_content) {
        res.status(400).json({message: "wrong request"});
        console.log('No title or No Content');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    const articleModel = new articles();
    articleModel.no = await articles.countDocuments({}) + 1;
    articleModel.author = id;
    articleModel.title = article_title;
    //let today = new Date();
    //contentModel.date = today.toLocaleDateString();
    articleModel.views = 0;
    articleModel.content = article_content;
    articleModel.deleted = 0;

    articleModel
        .save()
        .then( async (article) => {
            const user = await users.findOne({"userId": id});
            user.userArticles.push(article.no);
            await user.save();

            res.status(200).json({'article_id': article.no, message:'succeed'}); // 응답 보낼 때는 message를 통해서 액션이 어떻게 처리되었는지 말해주는 걸로 전부 바꾸기
            console.log('Create success');
            return;
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR create] \n', err);
            return;
        });

}

const read = async (req, res) => {
    // 글 읽을 때마다 views 올라가야 함
    let maxNum = await articles.countDocuments({});

    if (req.query.article_id) {
        articles
            .findOne({"no": req.query.article_id})
            .then( async (article) => {
                if (!article){
                    res.status(400).json({message: 'article doesn\'t exist'});
                    console.log('Read Fail, article doesn\'t exist');
                    return;
                }
                else if (article.deleted){
                    res.status(400).json({message: 'deleted'});
                    console.log('Read Fail, deleted article');
                    return;
                }
                else {
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
                        temp.new_id = idx; // 이번 res에서만 새롭게 할당된 index
                        idx++;
                        temp.comment_id = elem.no;
                        temp.comment_author = elem.author;
                        temp.comment_title = elem.title;
                        temp.comment_content = elem.content;
                        temp.comment_created_at = elem.createdAt;
                        temp.comment_updated_at = elem.updatedAt;
                        box.push(temp);
                    }

                    res.status(200).json({"max_article_id": maxNum,
                                            "article_id": article.no,
                                            "article_author": article.author,
                                            "article_title": article.title,
                                            "article_views": article.views,
                                            "article_content": article.content,
                                            "article_created_at": article.createdAt,
                                            "article_updated_at": article.updatedAt,
                                            "article_comments": box
                    });

                    console.log('read one article success');
                    return;
                }
            })
            .catch((err) => {
                res.status(500).json({message: err});
                console.log('[ERROR read] \n', err);
                return;
            });
    }
    else if (req.query.article_author) {
        articles
            .find({"author": req.query.article_author})
            .then((results) => {
                let box = [];
                box.push({"max_article_id": maxNum});
                let idx = 1;
                for (const elem of results){
                    if (elem.deleted){
                        continue;
                    }
                    let temp = {};
                    temp.new_id = idx; // 이번 res에서만 새롭게 할당된 index
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
                console.log('read article_author success');
                return;
            })
            .catch((err) => {
                res.status(500).json({message: err});
                console.log('[ERROR read] \n', err);
                return;
            });
    }
    else if (req.query.amount) {
        // 이번만 잠시, 유저 정보와 특정 위치부터 보내기

        let box = {};

        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'invalid access token'});
            return;
        }
        const { id } = accessTokenData;

        let userBox = [];
        articles
            .find({"author": id})
            .then((results) => {
                let idx = 1;
                for (const elem of results){
                    if (elem.deleted){
                        continue;
                    }
                    let temp = {};
                    temp.new_id = idx; // 이번 res에서만 새롭게 할당된 index
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
                res.status(500).json({message: err});
                console.log('[ERROR read] \n', err);
                return;
            });

        const user = await users.findOne({"userId": id});
        box['user'] = {'id': user.userId,
                    'email': user.userEmail,
                    'internal_pub_key': user.servUserPubKey,
                    'external_pub_key': user.userPubKey,
                    'amount': 0, // need to be fixed
                    'level': 99, // need to be fixed
                    'user_article': userBox
                    };

        box['max_article_id'] = maxNum;
        //
        let query;
        if (req.query.num){
            query = {'deleted': 0, 'no': {'$lte': req.query.num}}
            // if (req.query.num < 1 || req.query.num > maxNum){
            //     res.status(400).json({message: 'wrong request'});
            //     console.log('[error] wrogn num');
            //     return;
            // }
        }
        else {
            query = {'deleted': 0}
        }
        let article_box = [];
        articles
            .find(query)
            .sort({"no": -1})
            .limit(req.query.amount)
            .then( async (results) => {
                let idx = 1;
                for (const elem of results){
                    let temp = {};
                    temp.new_id = idx; // 이번 res에서만 새롭게 할당된 index
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
                console.log('read article_author success');
                return;
            })
            .catch((err) => {
                res.status(500).json({message: err});
                console.log('[ERROR read] \n', err);
                return;
            });
    }
    else {
        res.status(400).json({message: 'wrong request'});
        console.log('[error] reach the end');
        return;
    }

}

const update = async (req, res) => {
    const { article_id, article_title, article_content } = req.body;

    if (!article_id || !article_title || !article_content) {
        res.status(400).json({message: "wrong request"});
        console.log('No Id, No Title or No Content');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    const article = await articles.findOne({"no": article_id});
    if (article.author !== id || article.deleted){
        res.status(400).json({message: "wrong request: you are not the author or deleted article"});
        console.log('article\'s author and request id are different or deleted article');
        return;
    }
    article.title = article_title;
    article.content = article_content;
    await article.save();

    res.status(200).json({message:'succeed'});
    console.log('Update Success');
    return;
}

const del = async (req, res) => {
    const { article_id } = req.body;

    if (!article_id) {
        res.status(400).json({message: "wrong request: no article_id"});
        console.log('No Id');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    const article = await articles.findOne({"no": article_id});
    if (article.author !== id || article.deleted){
        res.status(400).json({message: "wrong request: you are not the author or deleted article"});
        console.log('article\'s author and request id are different or deleted article');
        return;
    }
    article.deleted = 1;
    await article.save();

    const user = await users.findOne({"userId": id});
    let temp = user.userArticles;
    user.userArticles = temp.filter((item) => {
        return item !== article_id;
    });
    await user.save();

    res.status(200).json({message:'succeed'});
    console.log('Delete Success');
    return;
}

module.exports = {
    create,
    read,
    update,
    del
}