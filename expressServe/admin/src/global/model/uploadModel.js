import request from '../request'
import api from './api'

export default {
  uploadAdd (params) {
    return request.post(api.upload, params)
  },
  uploadShow (params) {
    return request.get(api.upload, params)
  },
  uploadEdit (id, params) {
    return request.put(api.uploadId(id), params)
  },
  uploadDelete (id) {
    return request.delete(api.uploadId(id))
  }
}
