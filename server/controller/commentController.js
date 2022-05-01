const { isAuthorized } = require('./tokenFunc');
const articles = require('../models/article');
const comments = require('../models/comment')
const users = require('../models/user');
const article = require('../models/article');

const create = async (req, res) => {
    try{
        const { article_id, comment_title, comment_content } = req.body;
        if (!article_id || !comment_title || !comment_content) {
            res.status(400).json({message: 'fail, need article_id, comment_title and comment_content'});
            console.log('fail, need article_id, comment_title, and comment_content');
            return;
        }
    
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        await articles
            .findOne({"no": req.query.article_id})
            .then( async (article) => {
                if (article.deleted){
                    res.status(400).json({message: 'fail, deleted article'});
                    console.log('fail, deleted article');
                    return;
                }
    
                const commentModel = new comments();
                commentModel.no = article.comments.length + 1;
                commentModel.articleId = article.no;
                commentModel.author = String(id);
                commentModel.title = String(comment_title);
                commentModel.content = String(comment_content);
                commentModel.deleted = 0;
                
                await commentModel
                    .save()
                    .then( async (comment) => {
                        try{
                            const user = await users.findOne({"userId": id});
                            let temp = String(article.no) + '.' + String(comment.no);
                            user.userComments.push(temp);
                            await user.save();

                            const targetArticle = await articles.findOne({"no": comment.articleId});
                            targetArticle.comments.push(comment);
                            await targetArticle.save();
                        }
                        catch(err){
                            res.status(500).json({message: 'fail'});
                            console.error(err);
                            return;
                        }
                        res.status(200).json({'article_id': article.no, 'comment_id': comment.no, message:'succeed, create comment'});
                        console.log('succeed, create comment');
                        return;
                    })
                    .catch((err) => {
                        res.status(500).json({message: 'fail'});
                        console.error(err);
                        return;
                    });
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
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        let box = [];
        let idx = 1;
        let user;
        try{
            user = await users.findOne({"userId": id});
            if (!user){
                res.status(400).json({message: 'fail'});
                console.log('fail');
                return;
            }
        }
        catch(err){
            res.status(500).json({message: 'fail'});
            console.error(err);
            return;
        }

        for (const elem of user.userComments){
            const temp = elem.split('.');
            const article_id = Number(temp[0]);
            const comment_id = Number(temp[1]);

            try{
                const article = await articles.findOne({'no': article_id, 'deleted': 0});
                if (!article){
                    res.status(400).json({message: 'no matching article'});
                    console.log('no matching article');
                    return;
                }
            }
            catch(err){
                res.status(500).json({message: 'fail'});
                console.error(err);
                return;
            }

            box.push({'max_comment_id': article.comments.length})
            for (const com of article.comments){
                if (com.no == comment_id && !com.deleted){
                    box.push({'new_id': idx,
                                'comment_id': com.no,
                                'article_id': com.articleId,
                                'comment_author': com.author,
                                'comment_title': com.title,
                                'comment_content': com.content,
                                'comment_created_at': com.createdAt,
                                'comment_updated_at': com.updatedAt
                    });
                    idx++;
                    break;
                }
            }
        }
    
        res.status(200).json(box);
        console.log('succeed, read user own all comments');
        return;
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

const update = async (req, res) => {
    const { article_id, comment_id, comment_title, comment_content } = req.body;

    if (!article_id || !comment_id || !comment_title || !comment_content){
        res.status(400).json({message: 'fail, need article_id, comment_id, comment_title and comment_content'});
        console.log('fail, need article_id, comment_id, comment_title and comment_content');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'fail, invalid access token'});
        console.log('fail, invalid access token');
        return;
    }
    const { id } = accessTokenData;

    await articles
        .findOne({'no': article_id})
        .then( async (article) => {
            if (!article || article.deleted) {
                res.status(400).json({message : 'fail, no matching article'});
                console.log('fail, no matching article');
                return;
            }
            let flag = 0;
            for (const elem of article.comments){
                if (elem.author == id && elem.no == comment_id && !elem.deleted){
                    try{
                        elem.title = comment_title;
                        elem.content = comment_content;
                        await article.save();

                        const comment = await comments.findOne({"no": comment_id, "articleId": article_id});
                        comment.title = comment_title;
                        comment.content = comment_content;
                        await comment.save();
                    }
                    catch(err){
                        res.status(500).json({message: 'fail'});
                        console.error(err);
                        return;
                    }

                    flag = 1;
                    break;
                }
            }
            if (flag == 0){
                res.status(400).json({message : 'fail, no matching comment'});
                console.log('fail, no matching comment');
                return;
            }

            res.status(200).json({message: 'succeed, update'});
            console.log('succeed, update');
            return;
        })
        .catch((err) => {
            res.status(500).json({message: 'fail'});
            console.error(err);
            return;
        });
}

const del = async (req, res) => {
    try{
        const { article_id, comment_id } = req.body;
        if (!article_id || !comment_id) {
            res.status(400).json({message: 'fail, need article_id and comment_id'});
            console.log('fail, need article_id and comment_id');
            return;
        }
    
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData){
            res.status(400).json({message: 'fail, invalid access token'});
            console.log('fail, invalid access token');
            return;
        }
        const { id } = accessTokenData;
    
        await articles
            .findOne({'no': article_id})
            .then( async (article) => {
                if (!article || article.deleted) {
                    res.status(400).json({message : 'fail, no matching article'});
                    console.log('fail, no matching article');
                    return;
                }
                let flag = 0;
                for (const elem of article.comments){
                    if (elem.author == id && elem.no == comment_id && !elem.deleted){
                        try{
                            elem.deleted = 1;
                            await article.save();
        
                            const comment = await comments.findOne({'no': comment_id, 'articleId': article_id});
                            comment.deleted = 1;
                            await comment.save();
        
                            flag = 1;
                            break;
                        }
                        catch(err){
                            res.status(400).json({message: 'fail'});
                            console.error(err);
                            return;
                        }
                    }
                }
                if (flag == 0){
                    res.status(400).json({message : 'fail, no matching comment'});
                    console.log('fail, no matching comment');
                    return;
                }
                
                try{
                    let comp = String(article_id) + '.' + String(comment_id);
                    const user = await users.findOne({"userId": id});
                    let temp = user.userComments;
                    user.userComments = temp.filter((item) => {
                        return item !== comp;
                    });
                    await user.save();
                }
                catch(err){
                    res.status(400).json({message: 'fail'});
                    console.error(err);
                    return;
                }

                res.status(200).json({message: 'succeed, delete comment'});
                console.log('succeed, delete comment');
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

module.exports = {
    create,
    read,
    update,
    del
}