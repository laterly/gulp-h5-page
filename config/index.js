/*
* 默认配置文件
* */
module.exports = {
    paths: {
        src: {
            baseDir: "src",
            baseFiles: [
                "src/**/*",
                "!src/**/*.js",
                "!src/**/*.html",
                "!src/**/*.scss"
            ],
            htmlFiles: ["src/**/*.html"],
            cssFiles: ["src/**/*.scss","!src/front/lib/**"],
            jsFiles:["src/**/*.js","!src/front/lib/**"],
            imageFiles:["src/**/*.jpg","src/**/*.png","!src/front/lib/**"],
            assetsDir: "src/assets/**" //要上传到ftp或cdn的静态资源文件
        },
        dist: {
            baseDir: "dist",
            cssFiles: ["dist/**/*.css"],
            jsFiles:["dist/**/*.js"],
        }
    },
    server:{
        port:2233
    }
};
