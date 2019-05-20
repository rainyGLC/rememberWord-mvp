import Vue from 'vue'
import Router from 'vue-router'
import Classify from './views/classify.vue'
import Word from './views/word.vue'
import WordCreate from './views/word_create'
import WordEdit from './views/word_edit'
import Photo from './views/photo'
import Upload from './views/uploading'

Vue.use(Router)

const appRouter = new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
    {
      path: '/word',
      name: 'word',
      component: Word
    },
    {
      path: '/word_create',
      name: 'word_create',
      component: WordCreate
    },
    {
      path: '/word_edit',
      name: 'word_edit',
      component: WordEdit
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo
    },
    {
      path: '/uploading',
      name: 'uploading',
      component: Upload
    }
  ]
})

export default appRouter
