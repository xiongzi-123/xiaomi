// 在这里书写 guoxiangshop 这个项目的打包配置

/*
  gulp 里面提供的方法
    1. src()
      => 用来找到你要打包的文件的
      => src('你要打包的文件的地址')
      => 返回值就是一个 二进制流, 就可以继续去调用别的方法
    2. pipe()
      => 用来帮你做事情的
      => pipe(你要做的事情)
      => 返回值: 又是一个二进制流, 可以继续使用方法
    3. dest()
      => 用来写入文件的
      => 你要把已经压缩号的代码放在那一个文件夹里面
      => 如果没有你指定的文件夹, 会自动创建一个这个文件夹放进去
    4. parallel()
      => 用来并行执行多个任务的
      => gulp.parallel(你定义好的任务1, 你定义好的任务2, ...)
      => 他就会把这个几个任务都给你执行了
      => 返回值: 是一个任务流
      => 只要这个返回值以执行, 就能把你准备好的几个任务同时开始执行
    5. series()
      => 用来逐个执行多个任务的
      => gulp.series(任务1, 任务2, ...)
      => 返回值: 是一个任务流
      => 只要这个返回值一执行, 就能把你准备好的几个任务逐一完成
        -> 前一个任务完成在执行后面一个任务
    6. watch()
      => 用来监控文件变化的
      => gulp.watch(你要监控的文件目录, 你要执行的任务)
*/

// 1. 导入 gulp 这个第三方模块
const gulp = require('gulp')

// 2. 导入 gulp-cssmin 这个第三方模块
const cssmin = require('gulp-cssmin')

// 2-2. 导入 gulp-autoprefixer 这个第三方模块
const autoprefixer = require('gulp-autoprefixer')

// 3. 导入 gulp-uglify 这个第三方模块
const uglify = require('gulp-uglify')

// 3-2. 导入 gulp-babel 这个第三方模块
const babel = require('gulp-babel')

// 4. 导入 gulp-htmlmin 这个第三方模块
const htmlmin = require('gulp-htmlmin')

// 7. 导入 del 这个第三方模块
//    导入以后你会得到一个函数
//    不需要和 gulp 产生关联
//    直接使用就可以删除内容
const del = require('del')

// 8. 导入 gulp-webserver 这个第三方模块
//    导入以后可以得到一个函数
const webserver = require('gulp-webserver')

const sass=require('gulp-sass')

// 2. 先写一个打包 css 的方法
const cssHandler = () => {
  return gulp.src('./src/css/*.css')   // 找到 src 目录下 css 目录下 所有后缀为 .css 的文件
             .pipe(autoprefixer())   // 把 css 代码自动添加前缀
             .pipe(cssmin())  // 压缩 css 代码
             .pipe(gulp.dest('./dist/css'))  // 压缩完毕的 css 代码放在 dist 目录下的 css 文件夹里面
}

// 3. 书写一个打包 js 的方法
const jsHandler = () => {
  return gulp.src('./src/js/*.js') // 找到文件
             .pipe(babel({
               presets: ['@babel/env']
             })) // 转码 es6 转换成 es5 了, 就可以压缩了
             .pipe(uglify()) // 压缩
             .pipe(gulp.dest('./dist/js')) // 把压缩完毕的放入文件夹
}

// 4. 书写一个打包 html 的方法
const htmlHandler = () => {
  return gulp.src('./src/pages/*.html') // 找到要压缩的 html 文件
             .pipe(htmlmin({ // 想进行压缩, 需要在这个对象里面进行配置
               removeAttributeQuotes: true, // 移出属性上的双引号
               removeComments: true, // 移除注释
               collapseBooleanAttributes: true, // 把值为布尔值的属性简写
               collapseWhitespace: true, // 移除所有空格, 变成一行代码
               minifyCSS: true, // 把页面里面的 style 标签里面的 css 样式也去空格
               minifyJS: true, // 把页面里面的 script 标签里面的 js 代码给去空格
             })) // 压缩
             .pipe(gulp.dest('./dist/pages')) // 把压缩完毕的放到一个指定目录
}

// 5. 书写一个移动 image 文件的方法
const imgHandler = () => {
  return gulp.src('./src/images/**') // images 文件夹下的所有文件
             .pipe(gulp.dest('./dist/images')) // 放到指定目录就可以了
}

// 6. 书写一个移动 lib 文件的方法
const libHandler = () => {
  return gulp.src('./src/lib/**')
             .pipe(gulp.dest('./dist/lib'))
}

// 在打包的时候, 只是把你最新的 src 里面的所有内容给你压缩打包转移
//   不会把之前 dist 里面的文件删除
//   你把 abc.css 修改名字为 list.css 他就知道有一个 list.css 是新来的
//   并不知道是由 abc.css 重命名来的
// 最好就是在每次整体打包之前, 把 dist 目录删除了
//   用最新的 src 重新生成一遍内容
// 7. 书写一个任务, 自动删除 dist 目录
const delHandler = () => {
  // 这个函数的目的就是为了删除 dist 目录使用的
  return del(['./dist'])
}

// 8. 书写一个配置服务器的任务
//    在开发过程中直接把我写的东西在服务器上打开
//    因为我要一边写一个修改, 一遍测试
//    因为 gulp 是基于 node 运行的
//    这里就是使用 node 给我们开启一个服务器, 不是 apache, 也不是 nginx
// 自动刷新: 当 dist 目录里面的代码改变以后, 就会自动刷新浏览器
const serverHandler = () => {
  // 要把页面在服务器上打开
  // 打开的是 dist 目录里面我已经压缩好的页面
  return gulp.src('./dist') // 找到我要打开的页面的文件夹, 把这个文件夹当作网站根目录
             .pipe(webserver({ // 需要一些配置项
               host: 'localhost', // 域名, 这个域名可以自定义
               port: 8080, // 端口号, 0 ~ 65535, 尽量不适用 0 ~ 1023
               open: './pages/index.html', // 你默认打开的首页, 从 dist 下面的目录开始书写
               livereload: true, // 自动刷新浏览器 - 热重启
               // 所有的代理配置都在 proxies 里面
               /*
              //  proxies: [
              //    // 每一个代理配置就是一个对象
              //    {
              //      source: '/gx', // 源, 你的代理标识符
              //      // 你直接请求下面这个地址压根也拿不到东西, 因为跨域了
              //      target: 'http://127.0.0.1/test.php' // 目标, 你要代理的地址
              //    },
               
              //  ]
              */
             })) // 开启服务器
}
 
 const sassHandler=()=>{
    return gulp.src('./src/sass/*.scss')
                .pipe(sass())
                .pipe(autoprefixer())
                .pipe(cssmin())
                .pipe(gulp.dest('./dist/sass'))
  }
// */
/*
  webserver 这个第三方模块可以顺带配置代理
    + 直接在使用 webserver 的时候添加一个配置项
    + proxies: [
      // 数组里面的每一项都是你的代理配置
      {
        source: '/gx',
        target: '你要代理的地址'
      }
    ]
*/

/*
  webserver 使用自定义域名
    + 如果你想使用一个你自己定义的域名
      => 前提: 别用一个已经存在的网站(建议, 最好别用)
    + 修改一下你电脑里面的 hosts 文件
      => windows
        => 我的电脑 -> C: -> windows -> syatem32 -> drivers -> etc -> hosts
      => mac
        => 桌面 按下 command + shift + g -> 输入 /etc -> 在里面就能找到 hosts 文件
      => 修改
        => 在最后一行加一条
        => 127.0.0.1      你自己定义的域名
*/

// 9. 自动监控文件
//    监控 src 下下面的文件, 只要一修改, 就执行对应的任务
//    比如 src 下面的 css 文件夹, 只要里面的文件以修改, 我就执行以下 cssHandler 这个任务
const watchHandler = () => {
  // 监控着 src 下的 css 下的所有 .css 文件, 只要一发生变化, 就会自动执行一遍 cssHandler 任务
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/pages/*.html', htmlHandler)
  gulp.watch('./src/lib/**', libHandler)
  gulp.watch('./src/images/**', imgHandler)
  gulp.watch('./src/sass/*.scss', sassHandler)
}



// 导出一个默认任务
// 当我将来在命令行执行 gulp default 的时候, 就会自动把我写在 parallel 里面的五个任务给一起执行了
//   小细节: 当你在命令行执行 gulp default 的时候, 可以不写 default
//           你在命令行执行 gulp 这个指令, 就是在执行 gulp default
// module.exports.default = gulp.parallel(cssHandler, jsHandler, htmlHandler, libHandler, imgHandler)

// 就应该在压缩 css/js/html 之前先把 dist 目录删除了
//   要在删除完毕 dist 以后, 在执行 css/js/html/... 之类的压缩转移任务
module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, libHandler,sassHandler),
  serverHandler,
  watchHandler
)







// 最后在文件里面导出我准备号的这个方法
// 导出以后, 我们只能一个任务一个任务的执行
//   这个方式不好, 我们最好是准备一个任务
//   这个任务做的事情, 就是把我准备号的五个任务都给我执行了
// 不需要导出这五个任务了
// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.image = imgHandler
// module.exports.lib = libHandler
