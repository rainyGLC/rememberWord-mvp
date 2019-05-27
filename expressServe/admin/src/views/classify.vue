<template>
  <layout>
    <div class="classify-container">
      <div class="classify-create">
        <el-button type="primary" @click="classifyAdd()">添加分类</el-button>
      </div>

      <div class="classify-list">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="100">
            </el-table-column>

            <el-table-column prop="imageUrl" label="图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.imageUrl" class="upload-image">
              </template>

            </el-table-column>

            <el-table-column prop="name" label="分类名称" width="300">
            </el-table-column>
            <el-table-column prop="operation" label="操作">

              <template slot-scope="scope">
                <el-button size="mini" @click="classifyEdit(scope.row,scope.$index)">编辑</el-button>
                <el-button  size="mini" type="danger" @click="classifyDel(scope.row,scope.$index)">
                    删除
                </el-button>
              </template>

            </el-table-column>
          </el-table>
        </template>
      </div>

      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

      <el-dialog :title="formTitle" :visible="dialogFormVisible">
        <el-form>

          <el-form-item label="分类" :label-width="formLabelWidth">
            <el-input v-model="inputDate.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl"
              v-model="inputDate.imageUrl" class="avatar">
              <img v-else :src="inputDate.imageUrl" v-model="inputDate.imageUrl"
              class="image-avater">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!-- <el-input v-model="inputDate.name" autocomplete="off"></el-input> -->

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible =false">取 消</el-button>
          <el-button type="primary" @click="classifySave">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </layout>
</template>

<script>

import classifyModel from '@/global/model/classifyModel'

// import axios from 'axios';

export default {
  name: 'classify',
  data () {
    return {
      tableData: [],
      inputDate: {
        id: '',
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '50px',
      formTitle: '',
      TOKEN_API: 'https://www.jevescript.com/api/qiniu-token',
      QINIU_API: 'http://upload-z2.qiniup.com',
      imageUrl: ''
    }
  },

  created () {
    this.setupPage()
  },
  methods: {
    setupPage () {
      classifyModel.classifyShow().then((res) => {
      // console.log(res)
        this.tableData = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    classifyAdd () {
      this.dialogFormVisible = true
      this.formTitle = '添加分类'
      this.inputDate.name = ''
      // console.log(this.inputDate.name);
      this.inputDate.id = ''
      // console.log(this.inputDate.id)
      this.inputDate.imageUrl = ''
    },
    classifyEdit (row) {
      console.log(row)
      this.dialogFormVisible = true
      this.formTitle = '编辑分类'
      this.inputDate.name = row.name
      this.inputDate.imageUrl = row.imageUrl
      // console.log(this.inputDate);
      this.inputDate.id = row.id
    },
    beforeAvatarUpload: async function (file) {
      console.log(file)

      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片是为JPG 格式或png格式')
        return Promise.reject()
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return Promise.reject()
      }

      // 获取token

      let TOKEN_API = this.TOKEN_API
      let tokenFetch = await fetch(TOKEN_API).then((response) =>
        response.json())
      console.log(tokenFetch)
      let token = tokenFetch.data.uptoken
      // console.log(token);
      let domain = tokenFetch.data.domain
      // console.log(domain);
      let key = Date.now() + '_' + file.name
      let formData = new FormData()
      formData.append('file', file)
      formData.append('key', key)
      formData.append('fname', file.name)
      formData.append('token', token)
      formData.append('x.name', file.name)

      // 上传图片
      let QINIU_API = this.QINIU_API
      let qiniuFetch = await fetch(QINIU_API, {
        method: 'POST',
        body: formData
      }).then(response => response.json())
      let image_url = domain + '/' + key
      console.log(image_url)
      this.imageUrl = image_url

      console.log(this.imageUrl)
      return Promise.reject()
    },
    classifySave () {
      let id = this.inputDate.id
      console.log(id)
      let name = this.inputDate.name
      console.log(name)
      let imageUrl = this.imageUrl
      console.log(imageUrl)

      let params = { name, imageUrl }
      console.log(params)
      if (!name || !imageUrl) {
        this.$message.error('缺少参数')
        return
      }
      if (id) {
        classifyModel.classifyEdit(id, params).then((res) => {
          console.log(res)
          this.tableData.name = name,
          this.tableData.imageUrl = imageUrl,
          this.dialogFormVisible = false
          this.$message.success('修改成功')
        }).catch((err) => {
          this.dialogFormVisible = false
        })
      } else {
        classifyModel.classifyAdd(params).then((res) => {
          params.id = res.data[0]
          this.tableData.push(params)
          this.dialogFormVisible = false
          this.$message.success('添加成功')
        }).catch((err) => {
          this.dialogFormVisible = false
        })
      }
      this.setupPage()
    },
    classifyDel (row, index) {
      console.log(row)
      console.log(index)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => classifyModel.classifyDelete(row.id))
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      this.setupPage()
    }

  }
}

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-image{
    width: 40px;
  }
  .image-avater{
    width:100px;
    height:117px;
  }

</style>
