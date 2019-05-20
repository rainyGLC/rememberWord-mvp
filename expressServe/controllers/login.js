const UserModel = require('./../models/user.js');
const User = new UserModel();
const Weixin = require('./../models/weixin.js');


const loginControll = {
  login:async function(req,res,next){
    let code = req.body.code;
    // console.log(code);
    try{
      let weixinRequest = await Weixin.code2Session(code);
      let weixinData = weixinRequest.data;
      let open_id    = weixinData.openid;
      // console.log(open_id,'ooo');

      const users = await User.select({open_id});
      // console.log(users);
      const user = users[0];
      let id;
      
      if(!user){
        const userArr = await User.insert({open_id:open_id});
        // console.log(userArr)
        id = userArr[0]
      }else{
        id = user.id
      }
      res.json({code:200,data:id})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
} 
module.exports = loginControll;