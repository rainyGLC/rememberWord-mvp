const imageUrlModel = require('./../models/imageUrl.js');
const ImageUrl = new imageUrlModel

const imageUrlController = {
  insert: async function(req,res,next) {
    console.log("ooo")
    let imageUrl = req.body.imageUrl;
    console.log(imageUrl);
    if(!imageUrl){
      res.json({code:0,data:'参数输入不正确'});
      return
    }
    try{
      const imageUrlData = await ImageUrl.insert({imageUrl});
      res.json({code:200,data:imageUrlData})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  // show: async function(req,res,next){
  //   try{
  //     const imageUrl = await ImageUrl.all();
  //     res.json({code:200,data:imageUrl})
  //   }catch(e){
  //     console.log(e);
  //     res.json({code:0,data:e})
  //   }
  // },
  // update:async function(req,res,next) {
  //   let id = req.params.id;
  //   // console.log(id);
  //   let imageUrl = req.body.imageUrl;
  //   if(!imageUrl){
  //     res.json({code:0,data:'参数输入不正确！'})
  //   }
  //   try{
  //     const imageUrl = await ImageUrl.update(id,{imageUrl});
  //     res.json({code:200,data:imageUrl})
  //   }catch(e){
  //     console.log(e);
  //     res.json({code:0,data:e})
  //   }
  // },
  // delete:async function(req,res,next) {
  //   let id = req.params.id;
  //   try{
  //     await ImageUrl.delete(id);
  //     res.json({code:200,message:'删除成功!'})
  //   }catch(e){
  //     console.log(e);
  //     res.json({code:0,data:e})
  //   }
  // }
}
module.exports = imageUrlController;