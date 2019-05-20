<template>
  <div class="layout">
    <el-container class="layout-container">
      <el-header height="75px">
        <div class="height-aside">
          <p class="height-title">单词管理</p>
        </div>
        <div class="height-outlogin">
          <el-row>
            <el-button icon="el-icon-service">
              退出系统
            </el-button>
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-row class="tac">
            <el-col :span="12" id="tac-col">
              <el-menu
                default-active="3"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">

                <el-menu-item index="1">
                  <i class="el-icon-date"></i>
                  <span slot="title">
                    <router-link class="user-router" to="/classify">
                      分类管理
                    </router-link>
                  </span>
                </el-menu-item>

                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-share"></i>
                    <span>单词管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">
                      <router-link class="user-router" to="/word">
                        单词列表
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                      <router-link class="user-router" to="/word_create">
                        新建单词
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-menu-item index="3">
                  <i class="el-icon-picture-outline"></i>
                  <span slot="title">
                    <router-link class="user-router" to="/photo">
                      图片管理
                    </router-link>
                  </span>
                </el-menu-item>

                <el-menu-item index="4">
                  <i class="el-icon-upload2"></i>
                  <span slot="title">
                    <router-link class="user-router" to="/uploading">
                      上传图片
                    </router-link>
                  </span>
                </el-menu-item>

              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
      <el-footer>Copyright 2019 Design</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less'>
body html {
  height: 100vh;
}
.layout-container{
  height: 100vh;
  background-color:#fff;
}
  .el-header{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    color: #333;
    line-height: 75px;
    border-bottom:1px solid #e4e4e4;
  }
  .height-aside{
    width:280px;
    .height-title{
      display:inline-block;
      vertical-align:top;
      color:#000;
      font-size:20px;
    }
  }
  .el-footer{
    background-color: #fff;
    color:#333;
    text-align: center;
    line-height: 60px;
    border-top:1px solid #e4e4e4;
  }
  .el-aside {
    width:250px;
    border-right:1px solid #e4e4e4;
    background-color: #fff;
    color: #999;
    #tac-col{
      width:100%;
    }
    .user-router{
      text-decoration: none;
      color:#333;
    }
  }
  .el-main {
    background-color: #fff;
    color: #333;
    padding:40px;
  }
</style>
