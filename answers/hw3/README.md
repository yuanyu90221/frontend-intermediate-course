#   寫 CSS 必備神器：CSS 預處理器
+   1. 在 sass, less, stylus 之間選擇一套並且改寫之前的 CSS。
##  選用sass
+   1. 原因：因為跟 css語法很像，而且結構化也好用
+   2. 使用方式：利用 gulp 搭配 gulp-sass 去編譯
+   3. 具體步驟: 參考<http://edwardkuo.imas.tw/paper/2016/10/19/VisualStudio/2016-10-20/>
+   3.1. 搭建變異環境 `npm i -g gulp; npm i gulp gulp-sass` 
+   3.2. 配置好執行文件 gulpfile.js
+   3.3. 在gulpfile內定義 gulp task
<p>如下：我在gulpfile 定義兩個task:sass跟default,<br/> 
        default 為預設gulp會執行的task,<br/> 
        sass 會藉由gulp-sass轉換./assets/scss/下所有.scss的檔案成為.css到./assets/css/下<br/>
</p>        
<pre>  
    // Sass configuration
    var gulp = require('gulp');
    var sass = require('gulp-sass');

    gulp.task('sass', function() {
        gulp.src('./assets/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./assets/css/'))
    });

    gulp.task('default', ['sass'], function() {
        gulp.watch('./assets/scss/**/*.scss', ['sass']);
    });
</pre>

+   3.4. 執行編譯 `npm run build` 或是執行 `gulp`

##  使用properties
+   1. 使用box-shadow 讓div產生 陰影 並使用 第三個參數值產生blur效果
+   2. 使用filter:brightness(1.3) 讓div內容彩度變亮
+   3. 使用:hover filter來監聽 某class內的hover事件
+   4. 利用transition: 設定屬性變化效果 時間函數 以及效果時間 來覺定屬性變化的呈現方式
+   5. 利用cursor: pointer 讓hover過去時，顯示滑鼠為手指
##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw3/> 