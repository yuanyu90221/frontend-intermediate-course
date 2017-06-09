# 9 節省 Request 的極致：一為全，全為一
+   1. 把 CSS, JavaScript 都 inline 進 index.html
+   2. 不能發出任何 CSS 跟 JavaScript 的 Request
+   3. 主要是利用gulp把 css跟 js inline到html內
## 使用Lib
+   1. 使用 npm script在內部增加 merge-all script: webpack && gulp merge
```json
    "scripts": {
        "test": "gulp",
        "build": "gulp",
        "webpack": "webpack",
        "merge-all": "webpack && gulp merge"
    }
```

+   2. 使用 gulp-minfiy-css把 sass之後的 style.css壓縮成 style.min.css
```javascript
    // 把style.css 壓縮成 style.min.css
    gulp.task('minifyCss', ['sass'], function(){
        console.log('minifyCss');
        return gulp.src('./assets/css/style.css')
                .pipe(minifyCSS({
                    keepBreaks: false
                }))
                .pipe(rename('style.min.css'))
                .pipe(gulp.dest('./assets/css'));
    });
```

+   3. 使用 gulp-replace把 template.html內的 ```<style></style>```與```<script></script>```取代成style.min.css以及bundle.js的內容
```javascript
// 把 template.html <style></style>換成 style.min.css內容 以及把 <script></script>換成 bundle.js內容 並且 壓縮template.html成index.html
gulp.task('merge',['minifyCss'],function(){
    console.log('merge');
    return gulp.src('./assets/html/template.html')
        .pipe(replace(/<style><\/style>/g, function(s){
            let style = fs.readFileSync('./assets/css/style.min.css', 'utf8');
            return `<style>${style}</style>`;
        }))
        .pipe(replace(/<script><\/script>/g, function(s){
            let js = fs.readFileSync('./assets/js/bundle.js', 'utf8');
            return `<script>${js}</script>`;
        }))
        .pipe(minifyHtml({comments:false, spare:false, quotes: false}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});
```

+   4. 執行 npm run merge-all即可 先產生 bundle.js在把 所有內容放到 index.html
+   5. 目前 gulp merge這個 task 相依於 webpack 需要先執行 目前還沒想到好的辦法
##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw9/> 