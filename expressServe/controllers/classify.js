const ClassifyModel = require('./../models/classify.js');
const Classify = new ClassifyModel;

const classifyController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    if(!name){
      res.json({code:0,data:'参数输入不正确'});
      return
    }
    try{
      const classify = await Classify.insert({name});
      res.json({code:200,data:classify});
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  show: async function(req,res,next){
    try{
      const classify = await Classify.all();
      res.json({code:200,data:classify})
    }catch(e){
      console.log(e);
      res.json({code:0,data:e})
    }
  },
  update:async function(req,res,next) {
    let id = req.params.id;
    // console.log(id);
    let name = req.body.name;
    if(!name){
      res.json({code:0,data:'参数输入不正确！'})
    }
    try{
      const classify = await Classify.update(id,{name});
      res.json({code:200,data:classify})
    }catch(e){
      console.log(e);
      res.json({code:0,data:e})
    }
  },
  delete:async function(req,res,next) {
    let id = req.params.id;
    try{
      await Classify.delete(id);
      res.json({code:200,message:'删除成功!'})

    }catch(e){
      console.log(e);
      res.json({code:0,data:e})
    }
  }
}
module.exports = classifyController;