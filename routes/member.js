var express = require('express');
var router = express.Router();

var {Member, MemberObject} = require('../models/member/MemberClass');
var config = require('../common/config');
const xmlUtil = require('../models/common/xmlUtil');
const utils = require('../models/common/utils');

const passport = require('passport')
var metaPassport = require('../models/member/passport');

/* GET home page. */
router.post('/signUp', function(req, res, next) {
  var memberId = req.body.memberId;
  var memberPassword = req.body.memberPassword;
  var memberName = req.body.memberName;
  var memberEmail = req.body.memberEmail;

  var memberXMLFilePath = "/memberData/" + memberId + ".xml";

  var member = new MemberObject(memberId, memberPassword, memberName, memberEmail);
  var memberXMLStr = member.createMemberXMLStr();
  utils.saveFile(config.memberPath + memberXMLFilePath, memberXMLStr);

  var memberIndexStr = member.createMemberIndexStr(memberXMLFilePath);
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

// router.post('/signIn', function(req, res, next) {

//   console.log("=======================")
//   console.log(req.body.userId)

//   var errors = {};
//   var isValid = true;

//   if(!req.body.userId) {
//     isValid = false;
//     errors.memberId = 'ID is required!';
//   }

//   if(!req.body.userPassword) {
//     isValid = false;
//     errors.memberPassword = 'Password is required!';
//   }

//   if(isValid) {
//     console.log("발리드")
//     next();
//   } else {
//     req.flash('errors', errors);
//     res.redirect('/?success=no');
//   }
  
// },
// passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }
// ));
router.post('/signIn', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const fillteredUser = { ...user.dataValues };
      console.dir(fillteredUser);
      delete fillteredUser.password;
      return res.json(fillteredUser);
    });
  })(req, res, next);
});

module.exports = router;
