const WordModel = require('./../models/word.js');
const Word = new WordModel;
const ClassifyModel = require('./../models/classify.js');
const Classify = new ClassifyModel;



const wordController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    let title = req.body.title;
    let classify_id = req.body.classify_id;
    let description = req.body.description;
    let zn_display = req.body.zn_display;
    let en_display = req.body.en_display;

    if(!name || !title || !classify_id || !description || !zn_display || !en_display){
      res.json({code:0,data:'参数输入不正确'});
      return
    }
    try{
      const word = await Word.insert({name,title,classify_id,description,zn_display,en_display});
      const id = word[0];
      res.json({code:200,data:{id}});
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  
  list: async function(req,res,next){
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let classify_id = req.query.classify_id;
    console.log(classify_id);
    let params = {};
    let pagination = { page, limit };

    if(classify_id){
      params.classify_id = classify_id
    }

    const getCount = await Word.count(params);
    console.log(getCount);
    let count = getCount[0].sum;
    console.log(count); //10
    try{ 
      // let wordList =  await Word.all();
      let wordList = await Word.joinClassify(params,pagination);
      let paginations = {};
      paginations.total = count;
      paginations.pageSize = Number(limit);
      paginations.page  = Number(page);
      
      // console.log(wordList);
      res.json({code:200,data:wordList,paginations:paginations});
    }catch(e){
      res.json({code:0,data:e})
    }


    // try{
    //   const word = await Word.select({classify_id});
    //   res.json({code:200,data:word})
    // }catch(e){
    //   console.log(e);
    //   res.json({code:0,data:e})
    // }
  },

  show: async function(req,res,next) {
    let id = req.params.id;
    try{
      const word = await Word.select({id});
      const words = word[0];
      res.json({code:200,data:words})

    }catch(e){
      console.log(e);
      res.json({code:0,data:e})
    }
  },
  update:async function(req,res,next) {
    let id = req.params.id;
    console.log(id);
    let name = req.body.name;
    let title = req.body.title;
    let classify_id = req.body.classify_id;
    let description = req.body.description;
    let zn_display = req.body.zn_display;
    let en_display = req.body.en_display;

    if(!name || !title || !classify_id || !description || !zn_display || !en_display){
      res.json({code:0,data:'参数输入不正确'});
      return
    }
    try{
      const word = await Word.update(id,{name,title,classify_id,description,zn_display,en_display});
      // const id = word[0];
      res.json({code:200,data:word});
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  delete:async function(req,res,next) {
    
    let id = req.params.id;
    try{
      await Word.delete(id);
      res.json({code:200,message:'删除成功'});
    }catch(e){
      console.log(e);
      res.json({code,data:e})
    }
  }
}
module.exports = wordController;