const { isAuthorized } = require('./tokenFunc');
const contents = require('../models/content');
const stats = require('../models/stats');

const write = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
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

    const contentModel = new contents();
    contentModel.no = await contents.countDocuments({}) + 1;
    contentModel.author = id;
    contentModel.title = title;
    //let today = new Date();
    //contentModel.date = today.toLocaleDateString();
    contentModel.views = 0;
    contentModel.content = content;

    contentModel
        .save()
        .then((content) => {
            res.status(200).json({'no': content.no, message:'write success'}); // 응답 보낼 때는 message를 통해서 액션이 어떻게 처리되었는지 말해주는 걸로 전부 바꾸기
            console.log('Write success');
            return;
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR write] \n', err);
            return;
        });

}

const read = (req, res) => {
    // 글 읽을 때마다 views 올라가야 함

}

const list = (req, res) => {

}

module.exports = {
    write,
    read,
    list
}