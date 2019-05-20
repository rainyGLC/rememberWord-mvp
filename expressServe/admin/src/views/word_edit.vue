<template>
  <layout>
    <div class="articleCreate-container">

      <router-link class="word-router" to="/word">
        返回单词列表
      </router-link>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>编辑单词</span>
          <el-button icon="el-icon-edit" style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div class="text item">

          <el-form class="form-article" ref="form" :model="word"
          label-width="80px">
            <el-form-item label="单词名称">
              <el-input v-model="word.name"></el-input>
            </el-form-item>

             <el-form-item label="单词翻译">
              <el-input v-model="word.title"></el-input>
            </el-form-item>

            <el-form-item label="单词分类">
              <el-select v-model="word.classify_id" placeholder="请选择活动区域">
                <el-option v-for="item in classify" :key="item.id"
                  :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="中文发音">
              <el-input v-model="word.zn_display"></el-input>
            </el-form-item>

            <el-form-item label="英文发音">
              <el-input v-model="word.en_display"></el-input>
            </el-form-item>

            <el-form-item label="单词释义">
              <el-input type="textarea" :row="2" v-model="word.description"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="articleEdit">编辑</el-button>
             <!--  <el-button>取消</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </layout>
</template>

<script>

import classifyModel from '@/global/model/classifyModel'
import wordModel from '@/global/model/wordModel'

export default {
  name: 'word_edit',
  data () {
    return {
      word: {
        name: '',
        title: '',
        classify_id: null,
        description: '',
        zn_display: '',
        en_display: ''
      },
      classify: []
    }
  },
  created () {
    let id = this.$route.params.id
    console.log(id)
    wordModel.wordShowItem(id).then((res) => {
      console.log(res.data)
      this.word = res.data
    })

    classifyModel.classifyShow().then((res) => {
      // console.log(res)
      this.classify = res.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    articleEdit () {
      let id = this.$route.params.id
      console.log(id)
      let name = this.word.name
      let title = this.word.title
      let classify_id = this.word.classify_id
      let description = this.word.description
      let zn_display = this.word.zn_display
      let en_display = this.word.en_display
      if (!name || !title || !classify_id || !description || !zn_display || !en_display) {
        this.$message.error('缺少必要参数')
        return
      }
      wordModel.wordEdit(id, { name, title, classify_id, description, zn_display, en_display })
        .then(() => {
          this.$router.replace({ name: 'word' })
          this.$message.success('修改成功')
        }).catch(() => {
          this.$message.error('修改失败')
        })
    }
  }
}
</script>
<style lang="less">
  .word-router{
    color:#333;
  }
  .form-word{
    margin-top:30px;
    padding-right: 200px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top:20px;
    width: 800px;
  }
</style>
