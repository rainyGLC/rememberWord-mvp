# 技术单词记忆小程序

启动项目
后台:

    cd rememberWord-mvp

    cd expressServe
    npm install
     nodemon ./bin/www

显示后台页面(用vue-cli搭建)

    cd rememberWord-mvp
    cd expressServe
    cd admin
    npm run serve
    打开网址:http://localhost:8080/admin/classify

### 项目描述:

在我刚刚开始接触开发时候，经常遇到很多技术上的专业词汇，就萌生出一个想法，开发一个便利于大家记忆和管理的应用。在实现这个想法中，使用微信小程序作为前端展示的承载，使用 Vue 配合 Element Ui 开发后台，使用 Node.js express 完成操作 MySQL 数据的接口。最终实现一个数据的后台管理系统，并且在微信小程序上展示管理后数据。

### 项目展示：

后台展示:

![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/18.png)
![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/20.png)
![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/21.png)
![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/22.png)
![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/18.png)


小程序展示:


![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/23.png)![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/24.png)![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/25.png)![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/26.png)![图片](https://raw.githubusercontent.com/rainyGLC/rememberWord-mvp/master/images/27.png)


小程序主要分为两个页面：
1. 分类页面：展示数据中所有的分类，点击任意分类，可以跳转到该分类下的单词列表，点击任意单词  
可以跳转到该单词的详情页，点击收藏星星高亮，取消高亮即取消收藏
2. 我的页面 需要先授权登录，点击我的收藏，跳转到我的收藏单词页面

