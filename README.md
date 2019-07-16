### 项目目录

```
.
├── src
    ├── index.html          // home主页
        ├── style           //样式
        ├── js              //js
        ├── images          //图片
    ├── front               // 多页目录
        ├── index           //多页目录地址名
            ├── index.html  //首页html
            ├── style       //样式
            ├── js          //js
            ├── images      //图片
        ├── lib             //插件目录，不需要打包
├──  ├── config             // gulp配置文件
├── gulpfile.js             // gulp打包
├── package.json            // npm的依赖、项目信息文件
├── README.md

```

### 安装使用

##1. 全局安装 gulp 环境

```bash
npm install --global gulp
```

##2. 安装 package.json 中的依赖包

```bash
npm i
```

##3.启动编译

开发环境

```bash
npm run dev
```

生产环境

```bash
npm run build
```
