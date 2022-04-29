const { isAuthorized } = require('./tokenFunc');
const articles = require('../models/article');
const comments = require('../models/comment')
const users = require('../models/user');
const article = require('../models/article');

const create = async (req, res) => {
    const { article_id, comment_title, comment_content } = req.body;

    if (!article_id || !comment_title || !comment_content) {
        res.status(400).json({message: 'need article_id, comment_title or comment_content'});
        console.log('Create Fail');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    articles
        .findOne({"no": req.query.article_id})
        .then((article) => {
            if (article.deleted){
                res.status(400).json({message: 'deleted article'});
                console.log('deleted article');
                return;
            }

            const commentModel = new comments();
            commentModel.no = article.comments.length + 1;
            commentModel.articleId = article.no;
            commentModel.author = id;
            commentModel.title = comment_title;
            commentModel.content = comment_content;
            commentModel.deleted = 0;
            
            commentModel
                .save()
                .then( async (comment) => {
                    const user = await users.findOne({"userId": id});
                    let temp = String(article.no) + '.' + String(comment.no);
                    user.userComments.push(temp);
                    await user.save();

                    const targetArticle = await articles.findOne({"no": comment.articleId});
                    targetArticle.comments.push(comment);
                    await targetArticle.save();

                    res.status(200).json({'article_id': article.no, 'comment_id': comment.no, message:'succeed'});
                    console.log('Create comment success');
                    return;
                })
                .catch((err) => {
                    res.status(500).json({message: err});
                    console.log('[ERROR save comment] \n', err);
                    return;
                });
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR find article in creating comment] \n', err);
            return;
        });
}

const read = async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    let box = [];
    let idx = 1;
    const user = await users.findOne({"userId": id});
    for (const elem of user.userComments){
        const temp = elem.split('.');
        const article_id = Number(temp[0]);
        const comment_id = Number(temp[1]);
        const article = await articles.findOne({"no": article_id, "deleted": 0});
        if (!article){
            res.status(400).json({message: 'no matching article'});
            console.log('no matching article');
            return;
        }
        box.push({"max_comment_id": article.comments.length})
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
    console.log('Read user own all comments');
    return;

}

const update = async (req, res) => {
    const { article_id, comment_id, comment_title, comment_content } = req.body;

    if (!article_id || !comment_id || !comment_title || !comment_content){
        res.status(400).json({message: "wrong request"});
        console.log('No article_id, no comment_id, no comment_title, or no comment_content');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    articles
        .findOne({"no": article_id})
        .then( async (article) => {
            if (!article || article.deleted) {
                res.status(400).json({message : 'wrong request'});
                console.log('no matching article');
                return;
            }
            let flag = 0;
            for (const elem of article.comments){
                if (elem.author == id && elem.no == comment_id && !elem.deleted){
                    elem.title = comment_title;
                    elem.content = comment_content;

                    const comment = await comments.findOne({"no": comment_id, "articleId": article_id});
                    comment.title = comment_title;
                    comment.content = comment_content;
                    await comment.save();

                    flag = 1;
                    break;
                }
            }
            if (flag == 0){
                res.status(400).json({message : 'wrong request'});
                console.log('no matching comment');
                return;
            }
            await article.save();

            res.status(200).json({message: 'succeed'});
            console.log('update success');
            return;
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR update] \n', err);
            return;
        });
    
}

const del = async (req, res) => {
    const { article_id, comment_id } = req.body;

    if (!article_id || !comment_id) {
        res.status(400).json({message: "wrong request"});
        console.log('No article_id or No comment_id');
        return;
    }

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData){
        res.status(400).json({message: 'invalid access token'});
        return;
    }
    const { id } = accessTokenData;

    articles
        .findOne({"no": article_id})
        .then( async (article) => {
            if (!article || article.deleted) {
                res.status(400).json({message : 'wrong request'});
                console.log('no matching article 1');
                return;
            }
            let flag = 0;
            for (const elem of article.comments){
                if (elem.author == id && elem.no == comment_id && !elem.deleted){
                    elem.deleted = 1;

                    const comment = await comments.findOne({"no": comment_id, "articleId": article_id});
                    comment.deleted = 1;
                    await comment.save();

                    flag = 1;
                    break;
                }
            }
            if (flag == 0){
                res.status(400).json({message : 'wrong request'});
                console.log('no matching comment 2');
                return;
            }
            await article.save();

            let comp = String(article_id) + '.' + String(comment_id);
            const user = await users.findOne({"userId": id});
            let temp = user.userComments;
            user.userComments = temp.filter((item) => {
                return item !== comp;
            });
            await user.save();

            res.status(200).json({message: 'succeed'});
            console.log('delete success');
            return;
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR delete] \n', err);
            return;
        });

}

module.exports = {
    create,
    read,
    update,
    del
}