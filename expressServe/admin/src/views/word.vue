<template>
  <layout>
    <div class="classify-container">
      <router-link class="word-router" to="/word_create">
        <el-button type="primary">新建单词</el-button>
      </router-link>
      <template>
        <el-select v-model="classify_id" placeholder="请选择" @change="changehandle">
          <el-option
            v-for="item in classify"
            :key="item.id"
            :label="item.name"
            :value="item.id">{{item.name}}
          </el-option>
        </el-select>
      </template>

      <div class="word-list">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="100">

              <template slot-scope="scope">
              <span>{{(scope.$index + 1) + ( (pagination.page - 1) * pagination.pageSize) }}</span>
            </template>

            </el-table-column>
            <el-table-column prop="name" label="单词" width="100">
            </el-table-column>
            <el-table-column prop="title" label="翻译" width="100">
            </el-table-column>
            <el-table-column prop="classify_name" label="分类名称" width="100">
            </el-table-column>
            <el-table-column prop="description" label="释义" width="200">
            </el-table-column>
            <el-table-column prop="zn_display" label="中文发音" width="100">
            </el-table-column>
            <el-table-column prop="en_display" label="英文发音" width="100">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="articleEdit(scope.row.id)">编辑</el-button>
                <el-button  size="mini" type="danger" @click="articleDel(scope.row,scope.$index)">
                    删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <el-pagination
        style="float: right;margin-right: 40px;"
        background
        layout="prev, pager, next"
        :disabled="paginationDisabled"
        @current-change="pageChange"
        :page-size="pagination.pageSize"
        :current-page="pagination.page"
        :total="pagination.total">
      </el-pagination>
    </div>
  </layout>
</template>

<script>
import wordModel from '@/global/model/wordModel'
import classifyModel from '@/global/model/classifyModel'

export default {
  name: 'word',
  data () {
    return {
      tableData: [],
      classify: [],
      classify_id: '',
      paginationDisabled: true,
      pagination: {
        page: 1,
        total: 20, // 总条数
        pageSize: 5
      }
    }
  },
  created () {
    this.paginationDisabled = true
    classifyModel.classifyShow().then((res) => {
      // console.log(res)
      this.classify = res.data
      this.paginationDisabled = false
      // console.log(this.classify);
    }).catch((err) => {
      console.log(err)
    })
    this.getWord()

    // wordModel.wordAddShow().then((res) => {
    //   // console.log(res.data);
    //   this.tableData = res.data
    // })
  },
  methods: {
    changehandle () {
      // console.log(this.classify_id)
      // let classify_id = this.classify_id
      // wordModel.wordAddShow({ classify_id: classify_id }).then((res) => {
      //   console.log(res.data)
      //   this.tableData = res.data
      // })
      this.pagination.page = 1
      this.getWord()
    },
    pageChange (page) {
      this.pagination.page = page
      this.getWord()
    },
    getWord () {
      let limit = this.pagination.pageSize // 每5条为一页
      let page = this.pagination.page// 当前页
      let classify_id = this.classify_id || undefined
      let params = { limit, page, classify_id }
      wordModel.wordAddShow(params).then((res) => {
        console.log(res)
        this.tableData = res.data
        this.pagination = res.paginations
      // this.pagination = res.pagination
      })
    },
    articleEdit (id) {
      console.log(id)
      this.$router.push({ name: 'word_edit', params: { id } })
    },
    articleDel (row, index) {
      console.log(row)
      console.log(index)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => wordModel.wordDelete(row.id))
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
    }
  }
}
</script>

<style lang="less">
  .word-router{
    margin-right:15px;
    color:#333;
    font-size: 18px;
    text-decoration: none;
  }
  .word-list{
    margin-top:30px;
  }
</style>
