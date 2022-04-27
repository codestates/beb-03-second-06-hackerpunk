const { create, read, update, del } = require('../controller/articleController');
const express = require('express');
const router = express.Router();

router.post('/', create);
router.get('/', read);
router.put('/', update);
router.delete('/', del);

// 전체 글 수가 있다면, 한 페이지에 10개의 게시물이 보인다고 하면,
// 글 번호 몇 번 부터 몇 번까지 보내주는 것과 특정 글쓴이가 작성한 게시물 검색 기능 -> 일단 기본적인 두가지 구현

// 구현해야 할 것
// 글을 작성하기 post post /, 글 내용을 저장
// 작성된 글 목록들 보여주기(컨텐츠는 보내주지 말고 그냥 다른 정보들만, 글 내용 빼고) get /list, 시작글번호와 끝글번호를 쿼리로 -> 없이 보내면 가장 최근 글 10개 보내주고, 전체글 개수 보내줌
// 특정 글 모든 정보 보내주기 get /, 글번호 쿼리로
// 특정 저자가 쓴 글 검색 기능 get /, 저자 쿼리로

module.exports = router;