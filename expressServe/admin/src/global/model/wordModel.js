import request from '../request'
import api from './api'

export default {
  wordAdd (params) {
    return request.post(api.word, params)
  },
  wordAddShow (params) {
    return request.get(api.word, params)
  },
  wordEdit (id, params) {
    return request.put(api.wordId(id), params)
  },
  wordDelete (id) {
    return request.delete(api.wordId(id))
  },
  wordShowItem (id) {
    return request.get(api.wordId(id))
  }
}
