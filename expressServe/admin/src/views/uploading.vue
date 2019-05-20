<template>
  <layout>
    <div class="uploading">

      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="true"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-button class="button-sumbit" size="small" type="success"
      @click="submitUpload">添加图片</el-button>
    </div>
  </layout>
</template>

<script>

import uploadModel from '@/global/model/uploadModel'

export default {
  name: 'uploading',
  data () {
    return {
      TOKEN_API: 'http://localhost:8080/token',
      QINIU_API: 'http://upload-z2.qiniup.com',
      UPLOAD_API: 'https://www.jevescript.com/api/image-upload',
      imageUrl: ''
    }
  },
  methods: {
    beforeAvatarUpload: async function (file) {
      // console.log(file);

      // const isJPG = file.type === 'image/jpeg';
      // const isPNG = file.type === 'image/png';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG && ! isPNG) {
      //   this.$message.error('上传图片是为JPG 格式或png格式');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!');
      // }
      // return isJPG && isPNG && isLt2M;

      // 获取token

      let TOKEN_API = this.TOKEN_API;
      console.log(TOKEN_API);

      let tokenFetch = await fetch(TOKEN_API).then((response) =>
        response.json())
      console.log(tokenFetch,'ooo');
      let token = tokenFetch.uptoken;
      console.log(token,'kkkk');
      // let domain = tokenFetch.data.domain
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
      let image_url = 'http://prlrdry58.bkt.clouddn.com/' + key
      console.log(image_url)
      this.imageUrl = image_url

      console.log(this.imageUrl)

      return Promise.reject() //停止element本来的机制数据上传

      // console.log(qiniuFetch);

      // 上传图片地址

      // let UPLOAD_API = this.UPLOAD_API;
      // let uploadFetch = await fetch(UPLOAD_API, {
      //   method:'POST',
      //   body: JSON.stringify({imageUrl}),
      //   headers: {
      //     'content-type': 'application/json'
      //   },
      // }).then(response =>response.json())

      // console.log(uploadFetch, 'ooop');

      // if(uploadFetch.code === 200){

      //   alert('提交成功')
      // }else{
      //   alert('提交失败')
      // }
    },
    // handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //   },

    submitUpload () {
      let imageUrl = this.imageUrl
      console.log(imageUrl)
      if (!imageUrl) {
        this.$message.error('缺少图片')
        console.log('ooo')
        return
      }
      uploadModel.uploadAdd({ imageUrl }).then((res) => {
        console.log(res)
        this.$router.replace({ name: 'photo' })
        this.$message.success('添加成功')
      }).catch(() => {
        this.$message.error('添加失败')
      })
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
  .button-sumbit{

  }
</style>
