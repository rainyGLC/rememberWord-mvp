const qiniu = require('qiniu');
// console.log(qiniu);

var accessKey = '-qOBqDTYBiRHkubq6_pViec5hgERGmGRQzdAXvFY';
var secretKey = 'cxhLih0t77Oh0h4Prvj8-Wp_Rnz_eDiBkAReBt1B';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: 'test',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

const tokenController = {
  getToken:async function(req,res,next) {
    try{
      res.json({code:200,uptoken:uploadToken})
    }catch{
      res.json({code:0})
    }
  }

}
module.exports = tokenController;