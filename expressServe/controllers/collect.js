const CollectModel = require('./../models/collect.js');
const Collect = new CollectModel;
const WordModel = require('./../models/word.js');
const Word = new WordModel;


const collectController = {
  insert: async function(req,res,next) {
    let user_id = req.body.user_id;
    // console.log(user_id);
    let word_id = req.body.word_id;
    // console.log(word_id);
    if(!user_id || !word_id) {
      res.json({code:0,data:'params empty'});
      return 
    }
    try{
      let message;
      let collects = await Collect.select({user_id,word_id});
      // console.log(collects);
      if(collects.length<=0) {
        let addcollect = await Collect.insert({user_id,word_id})
        message ='收藏成功'
      }
      res.json({code:200,data:message})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  show: async function(req,res,next) {
    let user_id = req.query.user_id;
    // console.log(user_id);
    let params = {user_id};
    try{
      const collects = await Collect.joinWord(params);
      console.log(collects);
      res.json({code:200,data:collects});
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  showId: async function(req,res,next) {
    let user_id = req.query.user_id;
    // console.log(user_id,'oooko');
    let word_id = req.query.word_id;
    console.log(word_id,'pppp');
    if(!user_id || !word_id) {
      res.json({code:0,data:'params empty'});
      return 
    }
    try{
      let message;
      let collects = await Collect.select({user_id,word_id});
      console.log(collects)
      if(collects.length <=0) {
        message = false
      }else if(collects.length>0) {
        message= true
      }
      res.json({code:200,data:message})

    }catch{
      res.json({code:0,data:e})
    }
  },
  delete: async function(req,res,next) {
    let user_id = req.query.user_id;
    // console.log(user_id,'kkk');
    let word_id = req.query.word_id;
    // console.log(word_id,'ooo');
    try{
      const collects = await Collect.where({word_id:word_id,user_id:user_id}).del()
      // console.log(collects);
      // await Collect.delete(id)
      res.json({code:200,message:'删除成功'})

    }catch(e){
      res.json({code:0,data:e})
    }
  },
}
module.exports = collectController;