"use strict";
const gulp = require("gulp"),
    path = require("path"),
    del = require("del"),
    replace = require("gulp-replace"),
    sass = require("gulp-sass"),
    htmlmin = require("gulp-htmlmin"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    config = require("./config/index.js"),
    connect = require('gulp-connect'),
    paths = config.paths; //引入路径配置

// clean 任务, dist 目录
function removeFiles() {
    return del(paths.dist.baseDir);
}

// 复制文件
function copyFiles(file, dest = paths.dist.baseDir) {
    let files = typeof file === "function" ? paths.src.baseFiles : file;
    return gulp.src(files, {
        allowEmpty: true
    }).pipe(gulp.dest(dest));
}

// 编译.scss
function compileCss(file, dest = paths.dist.baseDir) {
    let files = typeof file === "function" ? paths.src.cssFiles : file;
    return gulp
        .src(files, {
            allowEmpty: true
        })
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename({
            extname: ".css"
        })) //修改文件类型
        .pipe(replace(/.(scss)/i, ".css")) //替换引用其他样式文件时的路径
        .pipe(plumber.stop())
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
}
//编译js
function compileJs(file, dest = paths.dist.baseDir) {
    let files = typeof file === "function" ? paths.src.jsFiles : file;
    return gulp
        .src(files, {
            allowEmpty: true
        })
        .pipe(plumber())
        .pipe(
            babel({
                presets: ["@babel/env"]
            })
        )
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
}

// html
function compileHtml(file, dest = paths.dist.baseDir) {
    let files = typeof file === "function" ? paths.src.htmlFiles : file;
    let options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp
        .src(files, {
            allowEmpty: true
        })
        .pipe(plumber())
        .pipe(htmlmin(options))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
}

//images
function compileImage() {

}

//监听文件
function watch() {
    let watcher = gulp.watch(["src/**", "!src/assets/**"], {
        ignored: /[/\\]\./
    });
    return watcher.on("all", watchHandler);
}

function watchHandler(event, file) {
    console.log(`${file},${event},running task...`);
    file = file.replace(/\\/g, "/"); //替换路径分隔符
    let ext_name = path.extname(file); // 文件扩展名
    let dest = replaceBaseDir(path.dirname(file)); // 文件输出目录

    if (event === "unlink") {
        let tmp = replaceBaseDir(file);
        if (/.(scss)$/i.test(ext_name)) {
            tmp = tmp.replace(ext_name, ".scss");
        }
        del(tmp);
    } else {
        if (/.(scss)$/i.test(ext_name)) {
            compileCss(file, dest); // scss 文件
        } else if (/.(js)$/i.test(ext_name)) {
            compileJs(file, dest); // js文件
        } else if (/.(html)$/i.test(ext_name)) {
            compileHtml(file, dest); // html 文件
        } else {
            copyFiles(file, dest);
        }
    }
}

// 替换目录路径
function replaceBaseDir(file) {
    return file.replace(`${paths.src.baseDir}`, `${paths.dist.baseDir}`);
}

//开启服务

function createServer() {
    return connect.server({
        name: 'Dev Server',
        root: [paths.dist.baseDir],
        livereload: true,
        port: config.server.port
    });
    connect.serverClose();
}
gulp.task("clean", removeFiles); // 删除任务
//开启服务
gulp.task('webserver', createServer);
//默认任务
gulp.task(
    "dev",
    gulp.series(copyFiles, gulp.parallel(compileCss, compileJs, compileHtml), watch)
);
//build任务
gulp.task(
    "build",
    gulp.series(copyFiles, gulp.parallel(compileCss, compileJs, compileHtml))
);