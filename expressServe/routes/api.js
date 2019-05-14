var express = require('express');
var router = express.Router();
var classifyController = require('./../controllers/classify.js');
var wordController = require('./../controllers/word.js');

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
router.get('/word/:id',wordController.show);
router.put('/word/:id',wordController.update);
router.delete('/word/:id',wordController.delete);




module.exports = router;