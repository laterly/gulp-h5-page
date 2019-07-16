/*
* 默认配置文件
* */
module.exports = {
    paths: {
        src: {
            baseDir: "src",
            baseFiles: [
                "src/**/*",
                "!src/assets/**",
                "!src/**/*.html",
                "!src/**/*.scss"
            ],
            htmlFiles: ["src/**/*.html"],
            cssFiles: ["src/**/*.scss"],
            jsFiles:["src/**/*.js"],
            imageFiles:["src/**/*.jpg","src/**/*.png"],
            assetsDir: "src/assets/**" //要上传到ftp或cdn的静态资源文件
        },
        dist: {
            baseDir: "dist"
        }
    },
    server:{
        port:2233
    }
};
