var express = require('express');
var router = express.Router();

var {Member, MemberObject} = require('../class/MemberClass');
var config = require('../common/config');
const xmlUtil = require('../common/xmlUtil');

/* GET home page. */
router.post('/signUp', function(req, res, next) {
  var memberId = req.body.memberId;
  var memberPassword = req.body.memberPassword;
  var memberName = req.body.memberName;
  var memberEmail = req.body.memberEmail;

  var memberIndexStr = new MemberObject(memberId, memberPassword, memberName, memberEmail).createMemberIndexStr();
  xmlUtil.insertIndex(config.memberPath + "/memberList.xml", "memberList", memberIndexStr).then(() => {
    res.send({"result":"성공!!!!"});
  });
});

router.post('/duplicationCheck', function(req, res, next) {
  var targetId = req.body.targetId;

  new Member().duplicationCheck(targetId).then(result => {
    res.json({"result":result});
  })
});

module.exports = router;
