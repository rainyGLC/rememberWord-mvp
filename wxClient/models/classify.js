const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  classifyShow(params) {
    return request({
      url:api.classify,
      method:'get',
      data:params
    })
  }
}