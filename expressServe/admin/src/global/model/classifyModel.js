import request from '../request'
import api from './api'

export default {
  classifyAdd (params) {
    return request.post(api.classify, params)
  },
  classifyShow (params) {
    return request.get(api.classify, params)
  },
  classifyEdit (id, params) {
    return request.put(api.classifyId(id), params)
  },
  classifyDelete (id) {
    return request.delete(api.classifyId(id))
  }
}
