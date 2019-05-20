var express = require('express');
var router = express.Router();
var classifyController = require('./../controllers/classify.js');
var wordController = require('./../controllers/word.js');
var imageController = require('./../controllers/imageUrl.js');
const loginController = require('../controllers/login.js');
const collectController = require('../controllers/collect.js');
/* GET users listing. */


router.post('/classify',classifyController.insert);
router.get('/classify',classifyController.show);
router.put('/classify/:id',classifyController.update);
router.delete('/classify/:id',classifyController.delete);



// router.get('/word', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/word',wordController.insert);
router.get('/word',wordController.list);
//获取指定id的单词
router.get('/word/:id',wordController.show);
router.put('/word/:id',wordController.update);
router.delete('/word/:id',wordController.delete);


//上传图片等增删改查
router.post('/upload',imageController.insert);
// router.get('/upload',imageController.show);
// router.put('/upload',imageController.update);
// router.delete('/upload',imageController.delete);

router.post('/login',loginController.login);

//收藏功能
router.post('/collect',collectController.insert);
router.get('/collectId',collectController.showId);
router.get('/collect',collectController.show);
router.delete('/collectDetele',collectController.delete);





module.exports = router;