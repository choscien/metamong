var express = require('express');
var router = express.Router();

var Forum = require('../models/forumBoard/ForumClass');
var config = require('../common/config');
const xmlUtil = require('../models/common/xmlUtil');
const utils = require('../models/common/utils');

// 게시글 작성 창 이동
router.get('/writePost', function(req, res, next) {
    // 나중에 세션에 있는 회원정보 넣어야함

    res.render('forumForm', { title: 'Express' });
});

router.post('/addPost', function(req, res, next) {
    var forumNo = "";
    var forumDate = "";
    var forumView = "";
    var forumLike = "";
    var forumDislike = "";

    // 글번호

    // 작성 날짜
    forumDate = new Date();
    
    var forumTitle = req.body.title;
    var forumContents = req.body.contents;
    var forumWriter = "anonymous";

    if(req.body.writer) {
        forumWriter = req.body.writer;
    }

    var forumContentsForSearch = forumNo + "   " + forumDate + "   " + forumTitle + "   " + forumContents + "   " + forumWriter;

    // 포럼 게시판 파일 경로  
    var forumXMLFilePath = "/forumData/" + forumTitle + "_" + forumWriter + "_" + utils.createFileName() + ".xml";

    // 게시글 XML 생성
    var forum = new Forum(forumNo, forumTitle, forumContents, forumDate, forumWriter, forumView, forumLike, forumDislike, forumContentsForSearch);
    var forumXMLStr = forum.createForumXMLStr();
    utils.saveFile(config.forumPath + forumXMLFilePath, forumXMLStr);

    //게시글 리스트 XML 추가  
    var forumIndexStr = forum.createForumIndexStr(forumXMLFilePath);
    xmlUtil.insertIndex(config.forumPath + "/forumList.xml", "forumList", forumIndexStr).then(() => {
      res.send({"result":"성공!!!!"});
    });
});

module.exports = router;
  