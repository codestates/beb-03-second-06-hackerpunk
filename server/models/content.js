const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    no: Number, // article_id
    author: String, // article_author
    title: String, // article_title
    views: {type: Number, default:0}, // article_views
    content: String,
}, {timestamps: true}); //createdAt -> article_created_at, updatedAt -> article_updated_at

module.exports = mongoose.model('Content', contentSchema);

//content에 대해서 각각의 답글을 map으로 한다면, 그 map안에 답글을 어떠한 구조로 만들지 생각해봐야 함.

// user에 저장할, 본인이 작성한 게시글 리스트와 ... 컨텐츠의 메타데이터 ... 각 컨텐츠의 답글
// 컨텐츠를 수정하거나, 삭제하거나, 답글을 달거나 ... 그리고 해당 게시글에 대한 토큰 전송과 락업 기능도 한꺼번에 고려해야

// 사이트 전체에서 사용할 정보들 
