import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

/* [请求库]
** @params url         { string }   @default => '' [接口地址，统一在global/resource文件中]
** @params data/params { object }   @default => {} [发送数据]
** @params config      { object }   配置
*/
export default {
  post: function (url = '', data = {}, config) {
    return axios.post(url, data, config)
  },
  put: function (url = '', data = {}, config) {
    return axios.put(url, data, config)
  },
  get: function (url, params = {}, config) {
    const OPTIONS = Object.assign({ params }, config)
    return axios.get(url, OPTIONS)
  },
  delete: function (url = '', params = {}, config) {
    const OPTIONS = Object.assign({ params }, config)
    return axios.delete(url, OPTIONS)
  }
}
