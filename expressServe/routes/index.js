var express = require('express');
var router = express.Router();
var tokenController = require('./../controllers/token.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/token',tokenController.getToken);


module.exports = router;
