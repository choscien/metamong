var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET lotto page. */
router.get('/lotto', function(req, res, next) {
  res.render('lotto', { title: 'Express' });
});

/* GET forum page. */
router.get('/forum', function(req, res, next) {
  res.render('forum', { title: 'Express' });
});

/* GET member page. */
router.get('/member', function(req, res, next) {
  res.render('member', { title: 'Express' });
});

module.exports = router;
